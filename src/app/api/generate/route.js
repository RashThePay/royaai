import axios from "axios";
import translate from "@iamtraction/google-translate";

export async function POST(request) {
    const formData = await request.formData()
    const prompt = formData.get('prompt')
    const style = formData.get('style')
    const orientation = formData.get('orientation')
    let ratio = 'old_vertical_ratio';
    if (orientation == 'square') { ratio = 'RATIO_1'; }
    try {
        const english = await translate(prompt, {to: "en"});
        const prompt_en = english.text;
        let options = {
            "method": "post",
            "url": "https://securetoken.googleapis.com/v1/token?key=AIzaSyDCvp5MTJLUdtBYEKYWXJrlLzu1zuKM6Xw",
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,fa;q=0.8",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "x-client-version": "Chrome/JsCore/9.22.1/FirebaseCore-web",
                "x-firebase-appcheck": "eyJraWQiOiJYcEhKU0EiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjE4MTY4MTU2OTM1OTp3ZWI6Mjc3MTMzYjU3ZmVjZjU3YWYwZjQzYSIsImF1ZCI6WyJwcm9qZWN0c1wvMTgxNjgxNTY5MzU5IiwicHJvamVjdHNcL3BhaW50LXByb2QiXSwicHJvdmlkZXIiOiJyZWNhcHRjaGFfZW50ZXJwcmlzZSIsImlzcyI6Imh0dHBzOlwvXC9maXJlYmFzZWFwcGNoZWNrLmdvb2dsZWFwaXMuY29tXC8xODE2ODE1NjkzNTkiLCJleHAiOjE3MDg3ODY1NzgsImlhdCI6MTcwODc2ODU3OCwianRpIjoidHJmSjNkanREdGJZNk0wWFp5bVp1WFlqTy0yQUpCTWJWOHRnNUg2RkgzTSJ9.eGODGXpm4QaFKwCjPd0fwhGmi0J0g_qLOUWmpYM0g9DBgvteW4sHaeoBKglowpuJjJgPupqqJ46TSz9nRSgwbrLnC8tT7QW1kPddHYe4-jHSUXDmb7w1SlzaBUGjed7mhmEz6Wm6VA6FbLlo3x0LdwpaR5_8OioMv7vq0Ms78LYt-cOqFsmEEyWJNMAWjTs0N6ctudgdFc-WbmchXWek5nVs6eBAV9oI9xjQdNiR2aVnuC9E9HUDKIRZ9y6G1k-wQjegIZlNQA12BVr4y4dD4ZPRVWVhEierjih8g3zKcUIThZxYeBECwrHJGQXqLPSP99o9Vxnl4UzR3ZL-ptwzNplEmKkSpTveog4p6mxtKBlIQhBhvzrShvUk3OopvJraNs-HD8oRskR_tWsYyvFNed--QNQGqqWrB_U8VjBlxViLpSHFuVw8jU5ZiBCPDgp0TEEzivBnlOmp3-pFxHLPO46n_Y9ZBQ3Iq_B9QS8T1JEvNWYM8E1hkOqhb7GvEccu",
                "x-firebase-gmpid": "1:181681569359:web:277133b57fecf57af0f43a"
            },
            "data": "grant_type=refresh_token&refresh_token=AMf-vByZPrRRZlGan6ygqwm6Az07jeBSjiqXda4FLO8QpSJHQyxMSDudvV9J5q-EBThtszRuWxHqRWUskRqVSS08-cUTfne7n8ZAk4NW8r255rH4BG0PHMRSbex-zu-wb10cBbIJG-fu2y4Ml-g3qT8iCZxHxdbf8q6lRGlaWAozc0R2AeFEROg",
        };
        let res = await axios.request(options);
        let xtoken = res.data.idToken;

        options = {
            method: 'post',
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCvp5MTJLUdtBYEKYWXJrlLzu1zuKM6Xw',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: JSON.stringify({
                name: 'returnSecureToken',
                contents: true
            })
        }
        res = await axios.request(options);
        let mtoken = res.data.idToken;

        let headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://dream.ai/',
            'x-app-version': 'WEB-2.0.0',
            'Authorization': 'bearer ' + mtoken,
            'x-validation-token': xtoken,
            'Content-Type': 'text/plain;charset=UTF-8',
            'Origin': 'https://dream.ai',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'TE': 'trailers'
        };
        let data = {
            is_premium: false,
            input_spec: {
                prompt: prompt_en,
                style: style,
                display_freq: 10,
                aspect_ratio: ratio,
            }
        }
        options = {
            method: 'post',
            url: 'https://paint.api.wombo.ai/api/v2/tasks',
            headers: headers,
            data: JSON.stringify(data)
        }
        res = await axios.request(options);
        let task = res.data;
        options = {
            method: 'get',
            url: 'https://paint.api.wombo.ai/api/v2/tasks/' + task.id,
            headers: headers
        }
        while (true == true) {
            res = await axios.request(options);
            task = res.data;
            if (task.state == 'completed') {
                const response = await axios.get(task.result.final, { responseType: 'arraybuffer' });
                const base64String = Buffer.from(response.data, 'binary').toString('base64');
                const dataURL = `data:image/jpeg;base64,${base64String}`;
                return Response.json({ data: dataURL });
            }
            if (task.state == 'failed') return 'failed';
        }


    } catch (error) {
        console.error(error);
        return Response.json({ error: error });
    }
}
export async function GET() {
    const res = await fetch('https://icanhazip.com/')
    const result = await res.text();
    return Response.json({ ip: result })
}
