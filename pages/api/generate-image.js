import { Configuration, OpenAIApi } from 'openai';
const userId = `user_${Math.random() * 100}`;
export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res
      .status(403)
      .json({ status: 'failure', message: 'درخواست اشتباه بود' });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const prompt = req.body.prompt || '';
  if (prompt.length === 0) {
    return res.status(400).json({
      status: 'failure',
      error: {
        message: 'یک متن برای تولید عکس بنویسید',
      },
    });
  }
  try {
    const imageData = await openai.createImage(
      {
        prompt,
        n: 1,
        size: '512x512',
        user: userId,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
    res.status(200).json({
      status: 'success',
      url: imageData.data.data[0].url,
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        status: 'failure',
        error: {
          message: 'خطایی در درخواست رخ داده',
        },
      });
    }
  }
}
