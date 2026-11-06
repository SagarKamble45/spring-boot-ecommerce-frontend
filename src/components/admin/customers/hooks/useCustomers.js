import { useEffect, useMemo, useState } from "react";
import { MOCK_CUSTOMERS } from "../data/customerData";

const PAGE_SIZE = 10;

const useCustomers = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [pendingStatusCustomer, setPendingStatusCustomer] = useState(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !search ||
        customer.customerName.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        (customer.phone || "").includes(search);

      const matchesStatus =
        statusFilter === "ALL" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  // Pagination
  const totalElements = filteredCustomers.length;
  const totalPages = Math.ceil(totalElements / PAGE_SIZE);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredCustomers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredCustomers, currentPage]);

  // Reset page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Customer statistics
  const stats = useMemo(() => {
    return {
      totalCustomers: customers.length,

      activeCustomers: customers.filter(
        (customer) => customer.status === "ACTIVE",
      ).length,

      inactiveCustomers: customers.filter(
        (customer) => customer.status === "INACTIVE",
      ).length,

      totalOrders: customers.reduce(
        (total, customer) => total + (customer.totalOrders || 0),
        0,
      ),
    };
  }, [customers]);

  // Open customer details
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseCustomer = () => {
    setSelectedCustomer(null);
  };

  // Temporary mock status update
  const handleRequestStatusChange = (customer) => {
    setPendingStatusCustomer(customer);
  };

  const handleCancelStatusChange = () => {
    if (isStatusUpdating) return;

    setPendingStatusCustomer(null);
  };

  const handleConfirmStatusChange = () => {
    if (!pendingStatusCustomer || isStatusUpdating) return;

    setIsStatusUpdating(true);

    const customerId = pendingStatusCustomer.customerId;

    const updatedStatus =
      pendingStatusCustomer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        customer.customerId === customerId
          ? { ...customer, status: updatedStatus }
          : customer,
      ),
    );

    // Keep the selected profile status in sync if its modal is open.
    setSelectedCustomer((previousCustomer) =>
      previousCustomer?.customerId === customerId
        ? { ...previousCustomer, status: updatedStatus }
        : previousCustomer,
    );

    setPendingStatusCustomer(null);
    setIsStatusUpdating(false);
  };

  return {
    customers: paginatedCustomers,
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
  };
};

export default useCustomers;
