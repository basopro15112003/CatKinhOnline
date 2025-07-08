using Microsoft.AspNetCore.Identity.UI.Services;
using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;


namespace CatKinhOnline.Services.EmailSender
    {
    public class SmtpEmailSender : IEmailSender
        {
        private readonly IConfiguration _config;
        public SmtpEmailSender(IConfiguration config)
            {
            _config=config;
            }
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
            {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Nhôm Kính Quốc Thuần", _config["Email:From"]));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject=subject;
            emailMessage.Body=new TextPart("html") { Text=htmlMessage };

            using (var client = new SmtpClient())
                {
                await client.ConnectAsync(_config["Email:SmtpServer"], int.Parse(_config["Email:Port"]), true);
                await client.AuthenticateAsync(_config["Email:Username"], _config["Email:Password"]);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
                }
            }
        }
    }
