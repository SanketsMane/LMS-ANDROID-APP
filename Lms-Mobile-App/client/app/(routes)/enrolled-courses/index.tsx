import CourseCard from "@/components/cards/course.card";
import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

export default function EnrolledCourses() {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const { loading, user } = useUser();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) {
        setLoader(false);
        return;
      }

      try {
        setLoader(true);
        setError("");
        
        const response = await axios.get(`${SERVER_URI}/get-courses`);
        const allCourses: CoursesType[] = response.data.courses;
        
        // Filter courses that user is enrolled in
        const enrolledCourses = allCourses.filter((course: CoursesType) =>
          user?.courses?.some((userCourse: any) => userCourse.courseId === course._id || userCourse._id === course._id)
        );
        
        console.log('All courses:', allCourses.length);
        console.log('User courses:', user?.courses?.length || 0);
        console.log('Enrolled courses:', enrolledCourses.length);
        
        setCourses(enrolledCourses);
      } catch (error: any) {
        console.error('Failed to fetch enrolled courses:', error);
        setError("Failed to load enrolled courses");
      } finally {
        setLoader(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (loader || loading) {
    return <Loader />;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 50,
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
          Enrolled Courses
        </Text>
      </View>

      {error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Ionicons name="alert-circle" size={64} color="#DC3545" />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Nunito_600SemiBold",
              color: "#DC3545",
              textAlign: "center",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            Error Loading Courses
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Nunito_400Regular",
              color: "#666",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {error}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => {
              setError("");
              setLoader(true);
              // Refetch courses
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      ) : courses.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Ionicons name="book-outline" size={64} color="#CBD5E0" />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Nunito_600SemiBold",
              color: "#4A5568",
              textAlign: "center",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            No Enrolled Courses
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Nunito_400Regular",
              color: "#718096",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            You haven't enrolled in any courses yet. Explore our course catalog to get started!
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => router.push("/(tabs)/courses")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Browse Courses
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={courses}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <CourseCard item={item} />}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}
        />
      )}
    </LinearGradient>
  );
}
