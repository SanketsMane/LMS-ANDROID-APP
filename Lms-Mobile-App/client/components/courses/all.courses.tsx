import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_600SemiBold,
  Nunito_500Medium,
} from "@expo-google-fonts/nunito";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import CourseCard from "@/components/cards/course.card";
import HomeBannerSlider from "@/components/home/home.banner.slider";

export default function AllCourses({ showBanner = false }: { showBanner?: boolean }) {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Fetch courses from backend only
    axios
      .get(`${SERVER_URI}/get-courses`)
      .then((res: any) => {
        setCourses(res.data.courses || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Failed to fetch courses:', error.message);
        setCourses([]);
        setLoading(false);
      });
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
    Nunito_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderHeader = () => (
    <View>
      {showBanner && <HomeBannerSlider />}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000000",
            fontFamily: "Raleway_700Bold",
          }}
        >
          Popular courses
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
          <Text
            style={{
              fontSize: 15,
              color: "#2467EC",
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontFamily: "Nunito_500Medium" }}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={courses}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 16 }}>
            <CourseCard item={item} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
            <Text style={{ 
              fontSize: 18, 
              fontFamily: "Nunito_600SemiBold",
              color: '#666',
              textAlign: 'center'
            }}>
              No courses available yet
            </Text>
            <Text style={{ 
              fontSize: 14, 
              fontFamily: "Nunito_500Medium",
              color: '#999',
              textAlign: 'center',
              marginTop: 8,
              paddingHorizontal: 40
            }}>
              Check back later for new courses or create some courses in the admin panel
            </Text>
          </View>
        )}
      />
    </View>
  );
}
