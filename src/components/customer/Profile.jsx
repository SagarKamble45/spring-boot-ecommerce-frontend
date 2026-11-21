import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  getMyOrders,
  getUserAddresses,
} from "../../store/action";

import ProfileHeader from "./ProfileHeader";
import ProfileOverview from "./ProfileOverview";
import ProfileStats from "./ProfileStats";
import PersonalInformation from "./PersonalInformation";
import AccountSecurity from "./AccountSecurity";
import RecentActivity from "./RecentActivity";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

function Profile() {
  const dispatch = useDispatch();
  const {
    myOrders = [],
    myOrdersPagination,
    myOrdersLoading,
    myOrdersError,
  } = useSelector((state) => state.order);
  const {
    myProfile,
    user,
    profileLoading,
    profileError,
    profileUpdating,
    profileUpdateError,
    passwordUpdating,
    passwordUpdateError,
    address,
  } = useSelector((state) => state.auth);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Fetch profile from backend
  useEffect(() => {
    dispatch(getMyProfile());

    dispatch(
      getMyOrders("pageNumber=0&pageSize=5&sortBy=orderDate&sortOrder=desc"),
    );
     dispatch(getUserAddresses());
  }, [dispatch]);

  // Always prefer the latest backend profile
  const profileUser = myProfile || user;

  // Update profile
  const handleSaveProfile = async (updatedProfile) => {
    const result = await dispatch(updateMyProfile(updatedProfile));

    if (result?.ok) {
      setIsEditModalOpen(false);
    }
  };

  // Password integration comes next
  const handleChangePassword = async (passwordData) => {
    const result = await dispatch(changeMyPassword(passwordData));

    if (result?.ok) {
      setIsPasswordModalOpen(false);
    }
  };

  // Loading state
  if (profileLoading && !myProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-3 text-sm text-slate-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (profileError && !myProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Unable to load your profile
          </h2>

          <p className="mt-2 text-sm text-red-600">{profileError}</p>

          <button
            type="button"
            onClick={() => dispatch(getMyProfile())}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHeader
          user={profileUser}
          onEditProfile={() => setIsEditModalOpen(true)}
        />

        <ProfileOverview user={profileUser} />

        <ProfileStats
          totalOrders={myOrdersPagination?.totalElements ?? 0}
          wishlistItems={undefined}
          savedAddresses={address?.length ?? 0}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PersonalInformation user={profileUser} />

          <AccountSecurity
            onChangePassword={() => setIsPasswordModalOpen(true)}
          />
        </div>

        <RecentActivity 
          orders={myOrders}
          loading={myOrdersLoading}
          error={myOrdersError}
          onRetry={
            ()=> dispatch(getMyOrders("pageNumber=0&pageSize=5&sortBy=orderDate&sortOrder=desc"))
          }
        />

        <EditProfileModal
          user={profileUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          isSaving={profileUpdating}
          error={profileUpdateError}
        />

        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={handleChangePassword}
          isSaving={passwordUpdating}
          error={passwordUpdateError}
        />
      </div>
    </div>
  );
}

export default Profile;
