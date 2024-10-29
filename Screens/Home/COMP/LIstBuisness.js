import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useToast } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { DataService } from "../../../DataFetcherContext/FetchedData";
import EditBusinessModal from "./EditBusinessModal";
import { useNavigation } from "@react-navigation/native";
import {
  PlusCircle,
  FolderDown,
  UserSquareIcon,
  Table2,
  FileEdit,
  Briefcase,
} from "lucide-react-native";
import tw from "twrnc";

const ListBusiness = () => {
  const navigation = useNavigation();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const { dataUser, hit, setHit } = DataService();

  useEffect(() => {
    fetchBusinesses(dataUser);
  }, [page, hit]);

  const fetchBusinesses = async (dataUser) => {
    if (loading || page > totalPages) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://kops-enrty.vercel.app/api/businesses/user/${dataUser?.user?._id}`,
        {
          params: { page, limit: 20 },
        }
      );
      // Reset businesses if fetching the first page, otherwise append
      setBusinesses((prev) =>
        page === 1
          ? response.data.businesses
          : [...prev, ...response.data.businesses]
      );
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.show({
        description: error.message || "Failed to fetch businesses.",
        status: "error",
        duration: 1000,
        color: "red.400",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (business) => {
    setSelectedBusiness(business);
    setModalVisible(true);
  };

  const handleUpdateBusiness = (updatedBusiness) => {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((business) =>
        business?._id === updatedBusiness?._id ? updatedBusiness : business
      )
    );
  };

  const handleDelete = (businessId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => await deleteBusiness(businessId),
        },
      ]
    );
  };

  const deleteBusiness = async (businessId) => {
    setDeletingId(businessId);
    try {
      setLoading(true);
      await axios.delete(
        `https://kops-enrty.vercel.app/api/businesses/${businessId}`
      );
      setBusinesses((prevBusinesses) =>
        prevBusinesses.filter((business) => business._id !== businessId)
      );
      toast.show({
        description: "Business deleted successfully.",
        status: "success",
        duration: 1000,
        color: "#00df63",
      });
    } catch (error) {
      toast.show({
        description: error.message || "Failed to delete business.",
        status: "error",
        duration: 1000,
        color: "red.400",
      });
    } finally {
      setLoading(false);
      setDeletingId(null);
    }
  };

  const GoEntry = (item) => {
    navigation?.navigate("addentry", { selectedbusiness: item });
  };
  const GoReport = (item) => {
    navigation?.navigate("report", { selectedbusiness: item });
  };
  const renderBusiness = ({ item, index }) => (
    <View style={[styles.businessCard]}>
      <View style={tw`flex flex-row gap-0 mb-2 justify-center items-center`}>
        <View style={tw`flex-row h-[100px] justify-between w-[150px]`}>
          <TouchableOpacity
            onPress={() => GoEntry(item)}
            style={tw`flex-1 m-2 p-4 bg-[#F5F5F5] shadow-2xl rounded-xl items-center`}
          >
            <FileEdit color="#00df63" size={25} style={tw`mb-2`} />
            <Text style={tw`text-black text-xs text-center`}>Entries</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row h-[100px] justify-between w-[150px]`}>
          <TouchableOpacity
            onPress={() => GoReport(item)}
            style={tw`flex-1 m-2 p-4 bg-[#F5F5F5] shadow-2xl rounded-xl items-center`}
          >
            <Table2 color="#00df63" size={25} style={tw`mb-2`} />
            <Text style={tw`text-black text-xs text-center`}>Reports</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={tw`flex-row h-[100px] justify-between w-[100px]`}>
          <TouchableOpacity
            style={tw`flex-1 m-2 p-4 bg-[#F5F5F5] shadow-2xl rounded-xl items-center`}
          >
            <FolderDown color="#00df63" size={25} style={tw`mb-2`} />
            <Text style={tw`text-black text-xs text-center`}>Export</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <Text style={styles.businessTitle}>{item.businessName}</Text>
      <Text style={styles.businessDetail}>{item.businessType}</Text>
      <Text style={styles.businessDetail}>
        Services: {item.businessOption[0]}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={styles.button}
        >
          <Ionicons name="create-outline" size={25} color="#00df63" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item?._id)}
          style={styles.button}
          disabled={deletingId === item?._id}
        >
          {deletingId === item?._id ? (
            <ActivityIndicator size="small" color="red" />
          ) : (
            <Ionicons name="trash-outline" size={25} color="red" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* {businesses.length === 0 && !loading ? (
        
      ) : ( */}
      <FlatList
        data={businesses}
        renderItem={renderBusiness}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.noDataText}>No businesses available</Text>
          ) : null
        }
      />
      {/* )} */}
      <EditBusinessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        business={selectedBusiness}
        onUpdate={handleUpdateBusiness}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  businessCard: {
    padding: 15,
    backgroundColor: "#f7f7f7",
    marginVertical: 10,
    borderRadius: 8,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  businessDetail: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    color: "black",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});

export default ListBusiness;
