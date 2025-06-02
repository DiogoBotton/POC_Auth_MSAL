using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

#region Configuração de Options
builder.Services.AddOptions<AuthTokenOptions>().Bind(builder.Configuration.GetSection(nameof(AuthTokenOptions)));
builder.Services.AddOptions<AzureAd>().Bind(builder.Configuration.GetSection(nameof(AzureAd)));
#endregion

#region Configuração do Swagger

builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "POC MSAL API", Version = "v1" });

    // Configuração para autenticação JWT no Swagger
    var jwtSecurityScheme = new OpenApiSecurityScheme()
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });
});
#endregion

#region Configuração da autenticação e autorização JWT Bearer padrão e com a Microsoft (Azure AD / Entra ID)

builder.Services.AddAuthentication(op =>
{
    op.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    op.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, op =>
{
    var authConfig = builder.Configuration.GetSection(nameof(AuthTokenOptions))
                                          .Get<AuthTokenOptions>();

    op.RequireHttpsMetadata = false;
    op.SaveToken = true;

    op.TokenValidationParameters = new TokenValidationParameters
    {

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.Key)),

        ValidateAudience = true,
        ValidAudience = authConfig.Audience,

        ValidateIssuer = true,
        ValidIssuer = authConfig.Issuer,

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };

    op.Events = new JwtBearerEvents
    {
        OnChallenge = a =>
        {
            a.HttpContext.Response.StatusCode = 401;
            return Task.CompletedTask;
        },
    };
})
.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection(nameof(AzureAd)), nameof(AzureAd)); // Autenticação com Microsoft, definido o schema como "AzureId"

// Adicionando Autorização com o escopo da API (API.Auth)
builder.Services.AddAuthorization(opt =>
{
    var azureAdConfig = builder.Configuration.GetSection(nameof(AzureAd))
                                             .Get<AzureAd>();

    if (string.IsNullOrEmpty(azureAdConfig.Scope))
        throw new ArgumentException("O escopo não foi configurado no appsettings.json");

    opt.AddPolicy(azureAdConfig.Scope, policy =>
    {
        policy.RequireScope(azureAdConfig.Scope); // API.Auth, por exemplo
    });
});
#endregion

#region Liberando CORS

builder.Services.AddCors(setup => setup
                    .AddDefaultPolicy(policy =>
                        policy.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader()));

var app = builder.Build();
#endregion

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(); // Usando configuração de CORS

// Usando configurações de autenticação e autorização
// OBS: UseAuthentication() deve vir primeiro
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
