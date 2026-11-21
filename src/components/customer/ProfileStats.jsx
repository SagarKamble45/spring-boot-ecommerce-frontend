import { FaBoxOpen, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const statsConfig = [
  {
    key: "totalOrders",
    title: "Total Orders",
    icon: FaBoxOpen,
    iconStyle: "bg-blue-50 text-blue-600",
    description: "Orders placed",
  },
  {
    key: "wishlistItems",
    title: "Wishlist Items",
    icon: FaHeart,
    iconStyle: "bg-pink-50 text-pink-600",
    description: "Products saved",
  },
  {
    key: "savedAddresses",
    title: "Saved Addresses",
    icon: FaMapMarkerAlt,
    iconStyle: "bg-indigo-50 text-indigo-600",
    description: "Delivery locations",
  },
];

function ProfileStats({ totalOrders, wishlistItems, savedAddresses }) {
  const stats = {
    totalOrders,
    wishlistItems,
    savedAddresses,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {statsConfig.map((item) => {
        const Icon = item.icon;
        const value = stats[item.key];
        return (
          <div
            key={item.key}
            className="
              bg-white rounded-2xl border border-slate-100
              shadow-sm p-5
              hover:shadow-md transition-shadow duration-200
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {value ?? "--"}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {item.description}
                </p>

                {item.key === "savedAddresses" ? (
                  <Link
                    to="/addresses"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    See All Addresses →
                  </Link>
                ) : item.key === "totalOrders" ? (
                  <Link
                    to="/my-orders"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    See All Orders →
                  </Link>
                ) : 
                
                // item.key === "wishlistItems" ? (
                //   <Link
                //     to="/wishlist"
                //     className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                //   >
                //     View Wishlist →
                //   </Link>
                // ) :
                 null}
              </div>

              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${item.iconStyle}`}
              >
                <Icon />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileStats;
