"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  hobbies: string[];
  country: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  hobbies?: string;
  country?: string;
}




const hobbies = [
  "Nature",
  "Reading",
  "Gaming",
  "Music",
  "Art",
  "Sports",
  "Cooking",
  "Travel",
  "Dancing",
  "Martial Arts",
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

export function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    hobbies: [],
    country: "",
  });
  const { register } = useAuth({ middleware: "guest",redirectIfAuthenticated:'/dashboard' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  console.log(errors)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Hobbies validation
    if (formData.hobbies.length === 0) {
      newErrors.hobbies = "Please select at least one hobby";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleHobbyChange = (hobby: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: checked
        ? [...prev.hobbies, hobby]
        : prev.hobbies.filter((h) => h !== hobby),
    }));
    // Clear hobbies error when user selects at least one
    if (errors.hobbies && (checked || formData.hobbies.length > 1)) {
      setErrors((prev) => ({ ...prev, hobbies: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    console.log(formData)
    await register({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      gender: formData.gender,
      hobbies: formData.hobbies,
      country: formData.country,
      setErrors,
    });
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome aboard!
              </h2>
              <p className="text-gray-600">
                Your account has been created successfully
              </p>
            </div>
            <div className="bg-white/50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Name:</span> {formData.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> {formData.email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Username:</span>{" "}
                {formData.username}
              </p>
            </div>
            <Button
              onClick={() => setIsSuccess(false)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
            >
              Create Another Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto px-5 my-5  shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="30" fill="#F4C27A" stroke="#D9A066" strokeWidth="2" />
            <circle cx="12" cy="12" r="8" fill="#F4C27A" stroke="#D9A066" strokeWidth="2" />
            <circle cx="52" cy="12" r="8" fill="#F4C27A" stroke="#D9A066" strokeWidth="2" />
            <circle cx="22" cy="32" r="4" fill="#000" />
            <circle cx="42" cy="32" r="4" fill="#000" />
            <ellipse cx="32" cy="42" rx="4" ry="3" fill="#000" />
            <path d="M28 46 Q32 50 36 46" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <CardTitle className="text-3xl font-bold text-black">
          Register
        </CardTitle>
        <CardDescription className="text-gray-600">
          create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Chico Chipayco"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="chicochipayco@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-medium">
              Username *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="chicocaine"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.username
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 pr-10 h-11 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              Confirm Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`pl-10 pr-10 h-11 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Gender *</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="border-2 border-gray-300"
                />
                <Label htmlFor="male" className="text-gray-700">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="border-2 border-gray-300"
                />
                <Label htmlFor="female" className="text-gray-700">
                  Female
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="other"
                  id="other"
                  className="border-2 border-gray-300"
                />
                <Label htmlFor="other" className="text-gray-700">
                  Other
                </Label>
              </div>
            </RadioGroup>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Hobbies */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">
              Hobbies * (Select at least one)
            </Label>
            <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto p-2 border-2 border-gray-100 rounded-lg bg-gray-50/50">
              {hobbies.map((hobby) => (
                <div key={hobby} className="flex items-center space-x-2">
                  <Checkbox
                    id={hobby}
                    checked={formData.hobbies.includes(hobby)}
                    onCheckedChange={(checked) =>
                      handleHobbyChange(hobby, checked as boolean)
                    }
                    className="border-2 border-gray-300"
                  />
                  <Label htmlFor={hobby} className="text-sm text-gray-700">
                    {hobby}
                  </Label>
                </div>
              ))}
            </div>
            {errors.hobbies && (
              <p className="text-sm text-red-500">{errors.hobbies}</p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-gray-700 font-medium">
              Country *
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger
                className={`h-11 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.country ? "border-red-400" : "border-gray-200"
                }`}
              >
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r bg-black hover:bg-black/90 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/"
            className="text-bla hover:underline font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
