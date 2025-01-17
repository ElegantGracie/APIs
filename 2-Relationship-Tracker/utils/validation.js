const yup = require("yup");

const registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required").length(2, "First name must be more than 2 characters"),
    lastName: yup.string().required("Last name is required").length(2, "Last name must be more than 2 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    otherName: yup.string().optional().length(2, "Other name has to be more than 2 characters"),
    photo: yup.mixed().optional()
        .test("fileSize", "Photo must be less than 5MB", (value) => {return value && value.size <= 5 * 1024 * 1024})
        .test("fileType", "Photo must be a valid image", (value) => {return value && ["image/jpeg", "image/png"].includes(value.mimetype)})
});

module.exports = {
    registrationSchema
}