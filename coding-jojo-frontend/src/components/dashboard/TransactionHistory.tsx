import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useTransactions, TransactionData } from "../../hooks/useTransactions";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

interface TransactionHistoryProps {
  className?: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  className = "",
}) => {
  const { transactions, stats, pagination, loading, error, fetchTransactions } =
    useTransactions();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "",
    status: "",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters.page, filters.limit, filters.type, filters.status]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchTransactions(filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
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
        return "text-blue-700 bg-blue-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "failed":
        return "text-red-700 bg-red-100";
      case "cancelled":
        return "text-gray-700 bg-gray-100";
      case "refunded":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-gray-700 bg-gray-100";
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && transactions.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 ">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatAmount(stats.totalSpent)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 ">
                <Receipt className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Transactions</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalTransactions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 ">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Amount</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatAmount(stats.avgTransactionAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm">
        <div className="p-4 border-b border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900">
              Transaction History
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700  transition-colors text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300  text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="course_purchase">Course Purchase</option>
                <option value="subscription">Subscription</option>
                <option value="refund">Refund</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>

              <button
                onClick={handleSearch}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white  transition-colors text-sm"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Transaction List */}
        <div>
          {error && (
            <div className="p-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {transactions.length === 0 && !loading ? (
            <div className="p-8 text-center">
              <Receipt className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="text-xs font-medium text-gray-900 mb-2">
                No Transactions
              </h3>
              <p className="text-gray-600 text-sm">
                Your transaction history will appear here once you make a
                purchase.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-blue-100">
              {transactions.map((transaction: TransactionData) => (
                <div
                  key={transaction.id}
                  className="p-4 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-blue-100 ">
                        {transaction.type === "course_purchase" ? (
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        ) : transaction.type === "subscription" ? (
                          <Calendar className="w-4 h-4 text-purple-600" />
                        ) : (
                          <Receipt className="w-4 h-4 text-gray-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {transaction.course?.title ||
                              transaction.description}
                          </h3>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transaction.status)}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                transaction.status
                              )}`}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>ID: {transaction.transactionId}</span>
                          <span>{formatDate(transaction.createdAt)}</span>
                          <span className="capitalize">
                            {transaction.paymentMethod.type.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-900">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </p>
                      {transaction.completedAt && (
                        <p className="text-xs text-gray-600">
                          Completed {formatDate(transaction.completedAt)}
                        </p>
                      )}
                    </div>

                    <div className="ml-3">
                      <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="p-4 border-t border-blue-100">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">
                  Showing{" "}
                  {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems
                  )}{" "}
                  of {pagination.totalItems} transactions
                </p>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "page",
                        (pagination.currentPage - 1).toString()
                      )
                    }
                    disabled={pagination.currentPage === 1}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() =>
                              handleFilterChange("page", page.toString())
                            }
                            className={`w-8 h-8  text-sm ${
                              page === pagination.currentPage
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            } transition-colors`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handleFilterChange(
                        "page",
                        (pagination.currentPage + 1).toString()
                      )
                    }
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
