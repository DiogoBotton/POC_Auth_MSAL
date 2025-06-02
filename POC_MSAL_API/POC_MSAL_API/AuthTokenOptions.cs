public class AuthTokenOptions
{
    public required string Audience { get; set; }
    public required string Key { get; set; }
    public required string Issuer { get; set; }
    public required uint TokenDuration { get; set; }
}
