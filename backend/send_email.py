import smtplib, os
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
load_dotenv()
port = os.getenv("SMTP_PORT")
smtp_server = os.getenv("SMTP_SERVER")
sender_email = os.getenv("EMAIL")
password = os.getenv("EMAIL_PASS")

receiver_email = "pradeepkh312@gmail.com"

subject = "HTML Email without Attachment"
html = """\
<html>
  <body>
    <p>Hi,<br>
    This is a <b>test</b> email without an attachment sent using <a href="https://www.python.org">Python</a>.</p>
  </body>
</html>
"""

message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject

message.attach(MIMEText(html, "html"))

with smtplib.SMTP(smtp_server, port) as server:
    server.starttls()
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())

print('Sent')
