using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace POC_MSAL_API.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class AuthController : ControllerBase
{

    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpGet()]
    [Authorize(Policy = "API.Read.Wolf")]
    public IActionResult Auth()
        => Ok("Autenticação com a microsoft realizada com sucesso!");
}
