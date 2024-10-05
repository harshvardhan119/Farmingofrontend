import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "sonner";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { IoArrowBack } from "react-icons/io5";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [areaOfLand, setAreaOfLand] = useState(0);
  const [location, setLocation] = useState(null); // To store location coordinates

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First name is required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required.");
      return false;
    }
    if (!areaOfLand) {
      toast.error("Area of land is required.");
      return false;
    }
    if (!location) {
      toast.error("Set location on map.");
      return false;
    }

    return true;
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/dashboard");
    } else {
      toast.error("Please setup profile first.");
    }
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      console.log({ location });
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, areaOfLand, location },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile updated successfully.");
          navigate("/dashboard");
        }
      } catch (err) {
        console.log({ err });
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]); // Set location state to user's current location
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);
  // Component for handling map clicks to select the farmer's location
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng; // Get latitude and longitude on click
        setLocation([lat, lng]); // Set the location state
      },
    });

    // Render a Marker if the location is set
    return location === null ? null : <Marker position={location}></Marker>;
  }

  return (
    <div className="mx-auto mt-20 mb-10 p-4 shadow-2xl border-white rounded-3xl xl:w-[50vw] l:w-[50vw] md:w-[60vw] flex flex-col items-center justify-center overflow-auto hide-scrollbar">
      <div className=" h-[15vh] w-[15vw] absolute top-0 left-0 p-2">
        <img src="logo_svg.svg" />
      </div>
      <div onClick={handleNavigate} className="">
        <IoArrowBack className="w-12 relative right-72 top-4 text-4xl lg:text-5xl text-[#365170]/90 cursor-pointer" />
      </div>
      <div className="space-y-4 h-[110vh] flex flex-col items-center justify-center ">
        <h2 className="text-3xl font-bold mb-6 my-2">Farmer Profile</h2>
        {/* First Name Input */}
        <div>
          <label
            className="block text-gray-700 text-m font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            placeholder="eg. John"
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-[30vw] px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Last Name Input */}
        <div>
          <label
            className="block text-gray-700 text-m font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="eg. Doe"
            className="w-[30vw] px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Area of Land Input (in hectares) */}
        <div>
          <label
            className="block text-gray-700 text-m font-bold mb-2"
            htmlFor="areaOfLand"
          >
            Area of Land (in hectares)
          </label>
          <input
            id="areaOfLand"
            type="number"
            value={areaOfLand}
            onChange={(e) => setAreaOfLand(e.target.value)}
            required
            className="w-[30vw] px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Location Map */}
        <div>
          <label className="block text-gray-700 text-m font-bold mb-2">
            Select Location on Map (If Not automatically enabled)
          </label>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "20rem", width: "40rem" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
          <p className="text-gray-600 text-m mt-2">
            {location
              ? `Selected Coordinates: Latitude: ${location[0]}, Longitude: ${location[1]}`
              : "Click on the map to select your location."}
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-[20rem] bg-blue-500 text-white font-bold text-lg py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={saveChanges}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
