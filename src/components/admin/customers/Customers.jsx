import CustomerHeader from "./components/CustomerHeader";
import CustomerStats from "./components/CustomerStats";
import CustomerTable from "./components/CustomerTable";
import useCustomers from "./hooks/useCustomers";

import CustomerViewModal from "./components/CustomerViewModal";
import CustomerStatusModal from "./components/CustomerStatusModal";

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
    selectedCustomer,
    handleViewCustomer,
    handleCloseCustomer,

    pendingStatusCustomer,
    isStatusUpdating,
    handleRequestStatusChange,
    handleCancelStatusChange,
    handleConfirmStatusChange,
  } = useCustomers();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <CustomerHeader />

      {/* Customer Statistics */}
      <CustomerStats {...stats} />

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
      />

      {/* Temporary customer preview */}
      {selectedCustomer && (
        <CustomerViewModal
          isOpen={!!selectedCustomer}
          customer={selectedCustomer}
          onClose={handleCloseCustomer}
        />
      )}
      <CustomerStatusModal
        isOpen={!!pendingStatusCustomer}
        customer={pendingStatusCustomer}
        onClose={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
        isUpdating={isStatusUpdating}
      />
    </div>
  );
};

export default Customers;
