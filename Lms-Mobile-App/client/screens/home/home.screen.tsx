import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import SearchInput from "@/components/common/search.input";
import AllCourses from "@/components/courses/all.courses";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header />
      <SearchInput homeScreen={true} />
      <AllCourses showBanner={true} />
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
