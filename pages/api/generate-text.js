import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(403)
      .json({ status: "failure", message: "درخواست اشتباه بود" });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const messages =
    req.body.messages.map((message) => {
      return {
        role: message.role,
        content: message.content,
      };
    }) || "";
  if (messages.length === 0) {
    return res.status(400).json({
      status: "failure",
      error: {
        message: "یک سوال بپرسید",
      },
    });
  }
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "please always put all responses and codes in proper markdown format that matches the code language",
        },
        ...messages,
      ],
    });
    res.status(200).json({
      status: "success",
      result: completion.data.choices[0].message,
      question: messages[messages.length - 1],
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      if (
        error.response.status === 403 &&
        error.response.statusText === "Forbidden"
      ) {
        console.log("forbidden");

        res
          .status(error.response.status)
          .json({
            status: "failure",
            error: { message: "vpn لازمه متاسفانه!" },
          });
      } else {
        res.status(error.response.status).json(error.response.data);
      }
    } else {
      res.status(500).json({
        status: "failure",
        error: {
          message: "خطایی در درخواست رخ داده",
        },
      });
    }
  }
}
