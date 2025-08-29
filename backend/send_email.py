import smtplib, os, json
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()
def email_send(json_data):
 port = os.getenv("SMTP_PORT")
 smtp_server = os.getenv("SMTP_SERVER")
 sender_email = os.getenv("EMAIL")
 password = os.getenv("EMAIL_PASS")

 subject = "HTML Email without Attachment"

 base_dir = os.path.dirname(os.path.abspath(__file__))
 template_path = os.path.join(base_dir, "templates", "otp.html")

 try:
    with open(template_path, 'r') as file:
        html = file.read()
    print("Successfully read the HTML template.")

 except FileNotFoundError:
    print(f"Error: The file was not found at {template_path}")
    html = None
 except Exception as e:
    print(f"An error occurred while reading the file: {e}")

 data=json.loads(json_data)
 for key, value in data.items():
        placeholder = f"{{{{ {key} }}}}"
        html = html.replace(placeholder, str(value))

 message = MIMEMultipart()
 message["From"] = sender_email
 message["To"] = data.get("to")
 message["Subject"] = subject
 receiver_email = data.get("to")
 message.attach(MIMEText(html, "html"))

 with smtplib.SMTP(smtp_server, port) as server:
    server.starttls()
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())

 print('Sent')
