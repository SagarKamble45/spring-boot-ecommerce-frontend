import CustomerHeader from "./components/CustomerHeader";
import CustomerStats from "./components/CustomerStats";
import CustomerTable from "./components/CustomerTable";
import CustomerViewModal from "./components/CustomerViewModal";
import CustomerStatusModal from "./components/CustomerStatusModal";
import useCustomers from "./hooks/useCustomers";

const Customers = () => {
  const {
    customers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,

    currentPage,
    setCurrentPage,
    totalPages,
    totalElements,

    stats,
    customerStatsLoading,
    customerStatsError,
    refresh,
    refreshCustomerStats,

    customerLoading,
    customerError,

    selectedCustomer,
    customerDetails,
    customerDetailsLoading,
    customerDetailsError,
    retryCustomerDetails,
    handleViewCustomer,
    handleCloseCustomer,

    customerMutationError,

    pendingStatusCustomer,
    isStatusUpdating,
    handleRequestStatusChange,
    handleCancelStatusChange,
    handleConfirmStatusChange,
  } = useCustomers();

  return (
    <div className="space-y-6">
      <CustomerHeader />

      {/* Customer Statistics */}
      <CustomerStats
        {...stats}
        isLoading={customerStatsLoading}
        error={customerStatsError}
        onRetry={refreshCustomerStats}
      />

      {/* Customer Table */}
      <CustomerTable
        customers={customers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onView={handleViewCustomer}
        onToggleStatus={handleRequestStatusChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalElements={totalElements}
        loading={customerLoading}
        error={customerError}
        onRetry={refresh}
      />

      {/* Customer Details */}
      {selectedCustomer && (
        <CustomerViewModal
          isOpen={!!selectedCustomer}
          customer={selectedCustomer}
          customerDetails={customerDetails}
          isLoading={customerDetailsLoading}
          error={customerDetailsError}
          onRetry={retryCustomerDetails}
          onClose={handleCloseCustomer}
        />
      )}

      {/* Status Confirmation */}
      <CustomerStatusModal
        isOpen={!!pendingStatusCustomer}
        customer={pendingStatusCustomer}
        onClose={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
        isUpdating={isStatusUpdating}
        error={customerMutationError}
      />
    </div>
  );
};

export default Customers;
