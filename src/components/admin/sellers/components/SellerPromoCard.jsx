
import { ArrowRight, Store, UsersRound } from "lucide-react";

const SellerPromoCard = ({ onInviteSeller }) => {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-sm">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/10" />

      <div className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
          <Store size={25} />
        </div>

        <h2 className="mt-5 text-xl font-bold">
          Grow Your Seller Network
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">
          Bring more businesses to your marketplace and expand your product
          collection by onboarding new sellers.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
            <UsersRound size={18} />
          </div>
          <p className="text-xs leading-5 text-blue-100">
            Build a stronger marketplace with more sellers and products.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-7">
        <button
          type="button"
          onClick={onInviteSeller}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          Invite New Seller
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default SellerPromoCard;
