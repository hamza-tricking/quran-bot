const verses = [
  "إِنَّ مَعَ الْعُسْرِ يُسْرًا (الشرح: 6)",
  "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ (الطلاق: 3)",
  "فَاذْكُرُونِي أَذْكُرْكُمْ (البقرة: 152)",
  "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ (النحل: 127)",
  "وَقُل رَّبِّ زِدْنِي عِلْمًا (طه: 114)",
  "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ (البقرة: 153)",
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ (البقرة: 201)"
];

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 200, body: "ok" };
  }

  let update;
  try {
    update = JSON.parse(event.body);
  } catch (error) {
    return { statusCode: 200, body: "ok" };
  }

  // Telegram also sends updates without a text message (edits, photos, etc.)
  if (!update || !update.message) {
    return { statusCode: 200, body: "ok" };
  }

  const chatId = update.message.chat.id;
  const text = update.message.text || "";

  const reply = text.trim() === "/quran"
    ? verses[Math.floor(Math.random() * verses.length)]
    : "اكتب /quran للحصول على آية.";

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: reply })
  });

  return { statusCode: 200, body: "ok" };
};
