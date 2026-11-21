
// Format date into a readable Indian date format
export const formatProfileDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Get the first letter for the profile avatar
export const getProfileInitial = (username) => {
  if (!username || typeof username !== "string") {
    return "C";
  }

  return username.trim().charAt(0).toUpperCase() || "C";
};

// Format phone number for display
export const formatProfilePhone = (phone) => {
  if (!phone) return "Not available";

  return String(phone).trim() || "Not available";
};
