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
        return <CheckCircle className="w-4 h-4 text-green-500" />;
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
        return "text-green-400 bg-green-400/10";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "failed":
        return "text-red-400 bg-red-400/10";
      case "cancelled":
        return "text-gray-400 bg-gray-400/10";
      case "refunded":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="  bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 ">
                <CreditCard className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">
                  {formatAmount(stats.totalSpent)}
                </p>
              </div>
            </div>
          </div>

          <div className="  bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 ">
                <Receipt className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalTransactions}
                </p>
              </div>
            </div>
          </div>

          <div className="  bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 ">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Amount</p>
                <p className="text-2xl font-bold text-white">
                  {formatAmount(stats.avgTransactionAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="  bg-gray-900/80 backdrop-blur-sm border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">
              Transaction History
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2  bg-gray-900 hover:bg-gray-700 text-white  transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 pr-4 py-2  bg-gray-900 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="px-4 py-2  bg-gray-900 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="course_purchase">Course Purchase</option>
                <option value="subscription">Subscription</option>
                <option value="refund">Refund</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="px-4 py-2  bg-gray-900 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white  transition-colors"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Transaction List */}
        <div>
          {error && (
            <div className="p-6 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {transactions.length === 0 && !loading ? (
            <div className="p-12 text-center">
              <Receipt className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Transactions
              </h3>
              <p className="text-gray-400">
                Your transaction history will appear here once you make a
                purchase.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {transactions.map((transaction: TransactionData) => (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3  bg-gray-900 ">
                        {transaction.type === "course_purchase" ? (
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        ) : transaction.type === "subscription" ? (
                          <Calendar className="w-5 h-5 text-purple-400" />
                        ) : (
                          <Receipt className="w-5 h-5 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white">
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
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>ID: {transaction.transactionId}</span>
                          <span>{formatDate(transaction.createdAt)}</span>
                          <span className="capitalize">
                            {transaction.paymentMethod.type.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </p>
                      {transaction.completedAt && (
                        <p className="text-xs text-gray-400">
                          Completed {formatDate(transaction.completedAt)}
                        </p>
                      )}
                    </div>

                    <div className="ml-4">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
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
            <div className="p-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">
                  Showing{" "}
                  {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems
                  )}{" "}
                  of {pagination.totalItems} transactions
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "page",
                        (pagination.currentPage - 1).toString()
                      )
                    }
                    disabled={pagination.currentPage === 1}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                            className={`w-8 h-8 rounded ${
                              page === pagination.currentPage
                                ? "bg-pink-600 text-white"
                                : "text-gray-400 hover:text-white"
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
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
