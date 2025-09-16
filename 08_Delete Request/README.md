🚀 Learning Express.js — DELETE Request

Today, I completed a tutorial on how to implement a DELETE request in an Express.js API.

I built a simple REST API with an in-memory mock database (array of users), where you can:

✅ Get all users

✅ Get a user by ID

🗑️ Delete a user by ID

🔑 Key takeaways:

-- Always validate route parameters (e.g., check if id is a valid number).
-- Handle errors properly with the right status codes:
-- 400 Bad Request for invalid IDs
-- 404 Not Found if the user doesn’t exist

Use splice() to remove an item from an array at a given index.
Return clear JSON responses to confirm success or failure.

💡 This was a great step in understanding how to manage resources lifecycle in RESTful APIs. Next, I’ll continue practicing with PUT and PATCH for updates.
