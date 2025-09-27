I maked this portfolio theme in just 3-4 days using tailwind css. In this code, there are a orginal(script.js) and a minified(script.min.js) file. To modify js, link up script.js insisted of script.min.js. I am satisfied to make it in a too short time. Watch the live preview here: [https://codeovik.github.io/ovik-portfolio-html-2/src](https://codeovik.github.io/ovik-portfolio-html-2/src) or, [https://ovik-portfolio-html.netlify.app/](https://ovik-portfolio-html.netlify.app/)

### Development timeline:
24 sep, 2025 - v1 released in github

### To run this on locally:
1. Clone the repository
```bash
git clone https://github.com/codeovik/ovik-portfolio-html-2.git
```
2. Go directory
```bash
cd ovik-portfolio-html-2
```
2. Install dependencies
```bash
npm i
```
3. Run tailwind css compailor
```bash
npm run dev
```

### Emailjs body html code:
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px;">
<div><span style="font-family: tahoma, arial, helvetica, sans-serif;"><strong>{{user_name}}</strong> has sent a form in your portfolio website.</span></div>
<div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: lightgrey;">
<table style="width: 35.7254%; height: 87px;" role="presentation">
<tbody>
<tr style="height: 87px;">
<td style="vertical-align: top; width: 14.0456%;">
<div style="padding: 6px 10px; margin: 0 10px; background-color: aliceblue; border-radius: 5px; font-size: 26px;" role="img"><span style="font-family: tahoma, arial, helvetica, sans-serif;">👤</span></div>
</td>
<td style="vertical-align: top; width: 85.9578%;">
<div style="color: #2c3e50; font-size: 16px;"><span style="font-family: tahoma, arial, helvetica, sans-serif;"><strong>Name:</strong> {{user_name}}</span></div>
<div style="color: #2c3e50; font-size: 16px;"><span style="font-family: tahoma, arial, helvetica, sans-serif;"><strong>Company:</strong> {{user_company}}</span></div>
<div style="color: #2c3e50; font-size: 16px;"><span style="font-family: tahoma, arial, helvetica, sans-serif;"><strong>Email:</strong> {{user_email}}</span></div>
<div style="color: #2c3e50; font-size: 16px;"><span style="font-family: tahoma, arial, helvetica, sans-serif;"><strong>Phone:</strong> {{user_phone}}</span></div>
</td>
</tr>
</tbody>
</table>
<p><span style="font-size: 14pt; font-family: tahoma, arial, helvetica, sans-serif;"><strong>Message:</strong> {{user_message}}</span></p>
</div>
</div>
```