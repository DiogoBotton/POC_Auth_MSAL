public class AzureAdB2C
{
    public required string Instance { get; set; }
    public required string Domain { get; set; }
    public required string ClientId { get; set; }
    public required string TenantId { get; set; }
    public required string ClientSecret { get; set; }
    public required string SignUpSignInPolicyId { get; set; }
    public required string EditProfilePolicyId { get; set; }
    public required string ResetPasswordPolicyId { get; set; }
    public required string Scope { get; set; }
}
