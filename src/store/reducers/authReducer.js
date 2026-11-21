
const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckoutAddress: null,

  // Address management
  addressLoading: false,
  addressError: null,
  addressMutationLoading: false,
  addressMutationError: null,

  // Customer profile
  myProfile: null,
  profileLoading: false,
  profileError: null,

  // Profile update
  profileUpdating: false,
  profileUpdateError: null,

  // Password update
  passwordUpdating: false,
  passwordUpdateError: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    // Login
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };

    // Profile loading
    case "PROFILE_LOADING":
      return {
        ...state,
        profileLoading: true,
        profileError: null,
      };

    // Profile fetched successfully
    case "FETCH_MY_PROFILE":
      return {
        ...state,
        myProfile: action.payload,
        user: action.payload,
        profileLoading: false,
        profileError: null,
      };

    // Profile fetch failed
    case "PROFILE_ERROR":
      return {
        ...state,
        profileLoading: false,
        profileError: action.payload,
      };

    // Start updating profile
    case "PROFILE_UPDATE_LOADING":
      return {
        ...state,
        profileUpdating: true,
        profileUpdateError: null,
      };

    // Successfully updated profile
    case "PROFILE_UPDATED":
      return {
        ...state,
        myProfile: action.payload,
        user: action.payload,
        profileUpdating: false,
        profileUpdateError: null,
      };

    // Profile update failed
    case "PROFILE_UPDATE_ERROR":
      return {
        ...state,
        profileUpdating: false,
        profileUpdateError: action.payload,
      };

    // Password update loading
    case "PASSWORD_UPDATE_LOADING":
      return {
        ...state,
        passwordUpdating: true,
        passwordUpdateError: null,
      };

    // Password updated successfully
    case "PASSWORD_UPDATE_SUCCESS":
      return {
        ...state,
        passwordUpdating: false,
        passwordUpdateError: null,
      };

    // Password update failed
    case "PASSWORD_UPDATE_ERROR":
      return {
        ...state,
        passwordUpdating: false,
        passwordUpdateError: action.payload,
      };

    // Address loading
    case "ADDRESS_LOADING":
      return {
        ...state,
        addressLoading: true,
        addressError: null,
      };

    // Addresses fetched successfully
    case "USER_ADDRESS":
      return {
        ...state,
        address: action.payload,
        addressLoading: false,
        addressError: null,
      };

    // Address fetch failed
    case "ADDRESS_ERROR":
      return {
        ...state,
        addressLoading: false,
        addressError: action.payload,
      };

    // Address mutation loading
    case "ADDRESS_MUTATION_LOADING":
      return {
        ...state,
        addressMutationLoading: true,
        addressMutationError: null,
      };

    // Address mutation successful
    case "ADDRESS_MUTATION_SUCCESS":
      return {
        ...state,
        addressMutationLoading: false,
        addressMutationError: null,
      };

    // Address mutation failed
    case "ADDRESS_MUTATION_ERROR":
      return {
        ...state,
        addressMutationLoading: false,
        addressMutationError: action.payload,
      };

    // Checkout address selection
    case "SELECT_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress: action.payload,
      };

    // Stripe client secret
    case "CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };

    // Clear checkout data
    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return {
        ...state,
        clientSecret: null,
        selectedUserCheckoutAddress: null,
      };

    // Logout
    case "LOG_OUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
