const yup = require("yup");

const registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required").min(2, "First name must be more than 2 characters"),
    lastName: yup.string().required("Last name is required").min(2, "Last name must be more than 2 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    otherName: yup.string().optional().min(2, "Other name has to be more than 2 characters"),
    photo: yup.mixed().optional()
        .test("fileSize", "Photo must be less than 2MB", (value) => !value || value.size <= 2 * 1024 * 1024)
        .test("fileType", "Photo must be a valid image", (value) => !value || ["image/jpeg", "image/png"].includes(value.mimetype))
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
})

module.exports = {
    registrationSchema,
    loginSchema
}