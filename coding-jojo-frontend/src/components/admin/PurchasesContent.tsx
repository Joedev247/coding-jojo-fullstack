// components/admin/PurchasesContent.tsx
import React, { useState, useEffect } from "react";
import {
  Search,
  FileText,
  BookOpen,
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  Calendar,
  Download,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  useTransactions,
  TransactionData,
  AdminTransactionStats,
} from "../../hooks/useTransactions";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const PurchasesContent: React.FC = () => {
  const {
    transactions,
    pagination,
    loading,
    error,
    fetchAdminTransactions,
    fetchAdminStats,
  } = useTransactions();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [adminStats, setAdminStats] = useState<AdminTransactionStats | null>(
    null
  );
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  useEffect(() => {
    const filters: any = { page: 1, limit: 20 };
    if (statusFilter !== "all") filters.status = statusFilter;
    if (typeFilter !== "all") filters.type = typeFilter;

    fetchAdminTransactions(filters);
  }, [statusFilter, typeFilter]);

  const loadAdminData = async () => {
    setStatsLoading(true);
    try {
      fetchAdminTransactions({ page: 1, limit: 20 });
      const stats = await fetchAdminStats();
      setAdminStats(stats);
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAdminTransactions({
      page: 1,
      limit: 20,
      status: statusFilter !== "all" ? statusFilter : undefined,
      type: typeFilter !== "all" ? typeFilter : undefined,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case "refunded":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatAmount = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      searchQuery === "" ||
      transaction.user?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.course?.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.transactionId
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const totalRevenue = adminStats?.total[0]?.amount || 0;
  const todayRevenue = adminStats?.today[0]?.amount || 0;
  const monthRevenue = adminStats?.thisMonth[0]?.amount || 0;
  const totalTransactions = adminStats?.total[0]?.count || 0;

  if (loading || statsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
        <p>Error loading transaction data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Revenue Overview */}
      {adminStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 ">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-white">
                {formatAmount(totalRevenue)}
              </p>
            </div>
          </div>

          <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 ">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Today's Revenue</p>
              <p className="text-2xl font-bold text-white">
                {formatAmount(todayRevenue)}
              </p>
            </div>
          </div>

          <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 ">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">This Month</p>
              <p className="text-2xl font-bold text-white">
                {formatAmount(monthRevenue)}
              </p>
            </div>
          </div>

          <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 ">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-white">
                {totalTransactions}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions, users, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3  bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3  bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3  bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="course_purchase">Course Purchase</option>
              <option value="subscription">Subscription</option>
            </select>

            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium transition duration-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Transaction ID
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  User
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Course/Type
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Payment Method
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.transactionId}
                  className="hover:bg-gray-800/50 transition duration-200"
                >
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-white">
                      {transaction.transactionId}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-white">
                      {transaction.user?.name || "Unknown User"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {transaction.user?.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-white">
                      {transaction.course?.title || transaction.type}
                    </div>
                    <div className="text-xs text-gray-400">
                      {transaction.type === "course_purchase"
                        ? "Course"
                        : "Subscription"}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-white">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-white">
                      {formatDate(transaction.createdAt)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-white">
                        {transaction.paymentMethod?.type || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1 capitalize">
                        {transaction.status}
                      </span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white transition duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition duration-200">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-between border-t border-gray-800   bg-gray-900/50 px-4 py-3 sm:px-6 mt-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                disabled={pagination.currentPage <= 1}
                className="relative inline-flex items-center  border border-gray-700  bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={pagination.currentPage >= pagination.totalPages}
                className="relative ml-3 inline-flex items-center  border border-gray-700  bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Showing{" "}
                  <span className="font-medium text-white">
                    {(pagination.currentPage - 1) * 20 + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-white">
                    {Math.min(
                      pagination.currentPage * 20,
                      pagination.totalItems
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-white">
                    {pagination.totalItems}
                  </span>{" "}
                  results
                </p>
              </div>{" "}
              <div>
                <nav
                  className="isolate inline-flex -space-x-px  shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    disabled={pagination.currentPage <= 1}
                    onClick={() =>
                      fetchAdminTransactions({
                        page: pagination.currentPage - 1,
                        limit: 20,
                        status:
                          statusFilter !== "all" ? statusFilter : undefined,
                        type: typeFilter !== "all" ? typeFilter : undefined,
                      })
                    }
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={pagination.currentPage >= pagination.totalPages}
                    onClick={() =>
                      fetchAdminTransactions({
                        page: pagination.currentPage + 1,
                        limit: 20,
                        status:
                          statusFilter !== "all" ? statusFilter : undefined,
                        type: typeFilter !== "all" ? typeFilter : undefined,
                      })
                    }
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 w-1 h-5 mr-3 rounded-full"></span>
              Top Performing Courses
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction, index) => (
                <div
                  key={transaction.transactionId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {transaction.course?.title || "Subscription"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.type === "course_purchase"
                          ? "Course"
                          : "Subscription"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods Distribution */}
        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Payment Methods
            </h3>
          </div>
          <div className="p-5 h-48 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Chart placeholder - Payment methods chart would render here
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
                <span className="text-sm text-gray-400">Credit Card (65%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm text-gray-400">PayPal (25%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm text-gray-400">
                  Bank Transfer (7%)
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span className="text-sm text-gray-400">Other (3%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasesContent;
