"use server";

export async function submitLead(formData: FormData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const project = formData.get("project");

  if (!name || !phone || !project) {
    return { success: false, message: "All fields are required." };
  }

  // Simulate storing lead in DB / Google Sheets
  console.log("New Lead Received:", { name, phone, project });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true, message: "Thanks! We'll get back to you in 24 hours." };
}
