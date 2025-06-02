using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace POC_MSAL_API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{

    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpPost("Microsoft")]
    [Authorize(AuthenticationSchemes = nameof(AzureAd))]
    public IActionResult Auth()
    {
        string name = User.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? "Nome não disponível";
        string email = User.Identity.Name ?? "Usuário não autenticado";

        return Ok($"Autenticação com a microsoft realizada com sucesso! Olá {name}, email: {email}");
    }


    [HttpPost("Internal")]
    public IActionResult LoginAPI(IOptionsSnapshot<AuthTokenOptions> tokenOptions)
    {
        var authTokenOptions = tokenOptions.Value;

        var claims = new List<System.Security.Claims.Claim>
        {
            new(JwtRegisteredClaimNames.Sub, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Name, "nome teste"),
            new(JwtRegisteredClaimNames.Email, "teste@email.com")
        };

        var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authTokenOptions.Key)), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(authTokenOptions.Issuer,
                                         authTokenOptions.Audience,
                                         claims,
                                         expires: DateTime.Now.AddMinutes(authTokenOptions.TokenDuration),
                                         signingCredentials: creds);

        return Ok(new
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

    [HttpGet("TestInternal")]
    [Authorize]
    public IActionResult TestLoginAPI()
        => Ok("Autenticação com a API realizada com sucesso!");
}
