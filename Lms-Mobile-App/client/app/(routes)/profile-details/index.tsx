import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  useFonts,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loader from "@/components/loader/loader";

export default function ProfileDetails() {
  const { user, loading, setRefetch } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  // Password change states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
    }
  }, [user]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      const response = await axios.put(
        `${SERVER_URI}/update-user-info`,
        {
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim() || undefined,
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Profile updated successfully");
        setRefetch(true);
      }
    } catch (error: any) {
      console.log("Profile update error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword.trim()) {
      Alert.alert("Error", "Current password is required");
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert("Error", "New password is required");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      const response = await axios.put(
        `${SERVER_URI}/update-user-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      console.log("Password change error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingTop: 50 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2467EC" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Raleway_700Bold",
              marginLeft: 16,
              color: "#2467EC",
            }}
          >
            Profile Details
          </Text>
        </View>

        {/* Profile Information Form */}
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 16,
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Raleway_700Bold",
              marginBottom: 20,
              color: "#333",
            }}
          >
            Personal Information
          </Text>

          {/* Name Field */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                color: "#555",
              }}
            >
              Full Name
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E2E8F0",
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: "Nunito_400Regular",
                backgroundColor: "#F8F9FA",
              }}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />
          </View>

          {/* Email Field */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                color: "#555",
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E2E8F0",
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: "Nunito_400Regular",
                backgroundColor: "#F8F9FA",
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Mobile Field */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                color: "#555",
              }}
            >
              Mobile Number
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E2E8F0",
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: "Nunito_400Regular",
                backgroundColor: "#F8F9FA",
              }}
              value={mobile}
              onChangeText={setMobile}
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Update Profile Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              borderRadius: 8,
              padding: 16,
              alignItems: "center",
            }}
            onPress={handleUpdateProfile}
            disabled={isLoading}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Nunito_700Bold",
              }}
            >
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Change Password Form */}
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 16,
            borderRadius: 12,
            padding: 20,
            marginBottom: 30,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Raleway_700Bold",
              marginBottom: 20,
              color: "#333",
            }}
          >
            Change Password
          </Text>

          {/* Current Password */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                color: "#555",
              }}
            >
              Current Password
            </Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 8,
                  padding: 12,
                  paddingRight: 50,
                  fontSize: 16,
                  fontFamily: "Nunito_400Regular",
                  backgroundColor: "#F8F9FA",
                }}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter current password"
                secureTextEntry={!showOldPassword}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                }}
                onPress={() => setShowOldPassword(!showOldPassword)}
              >
                <Ionicons
                  name={showOldPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                color: "#555",
              }}
            >
              New Password
            </Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 8,
                  padding: 12,
                  paddingRight: 50,
                  fontSize: 16,
                  fontFamily: "Nunito_400Regular",
                  backgroundColor: "#F8F9FA",
                }}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                }}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                color: "#555",
              }}
            >
              Confirm New Password
            </Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 8,
                  padding: 12,
                  paddingRight: 50,
                  fontSize: 16,
                  fontFamily: "Nunito_400Regular",
                  backgroundColor: "#F8F9FA",
                }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                }}
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#DC3545",
              borderRadius: 8,
              padding: 16,
              alignItems: "center",
            }}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Nunito_700Bold",
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
