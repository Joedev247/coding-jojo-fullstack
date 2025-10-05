"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Share2,
  Award,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Trophy,
  Star,
  Loader,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { certificationsService, Certificate, Badge, CertificationData } from "../../../lib/certificationsService";

const Certifications: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"certificates" | "badges">("certificates");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certificationData, setCertificationData] = useState<CertificationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const result = await certificationsService.getCertifications();
        if (result.success && result.data) {
          setCertificationData(result.data);
        }
      } catch (err) {
        console.error('Error fetching certification data:', err);
        setError('Failed to load certifications');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const certificates = certificationData?.certificates || [];
  const badges = certificationData?.badges || [];

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Certifications & Badges
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your achievements and earned certifications
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 ">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Certificates
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {certificates.length}
                </p>
              </div>
            </div>
          </div>

        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 ">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Badges Earned
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {badges.length}
                </p>
              </div>
            </div>
          </div>

        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 ">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Skills Earned
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {certificationData?.stats.earned || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("certificates")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "certificates"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Certificates ({certificates.length})
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "badges"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Badges ({badges.length})
            </button>
          </nav>
        </div>

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Award className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No certificates yet</p>
                <p className="text-gray-500 text-sm">
                  Complete courses to earn certificates
                </p>
              </div>
            ) : (
              certificates.map((certificate) => (
                <div key={certificate.id} className="group relative">
                  <div className="bg-white dark:bg-gray-800  p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 dark:text-white">
                        {certificate.course}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        Course Certificate
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Grade: {certificate.grade}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2 justify-center">
                        <button className="flex items-center gap-2 px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm  transition-colors">
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm  transition-colors">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {badges.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No badges earned yet</p>
                <p className="text-gray-500 text-sm">
                  Complete courses and achievements to earn badges
                </p>
              </div>
            ) : (
              badges.map((badge) => (
                <div key={badge.id} className="group relative">
                  <div className="bg-white dark:bg-gray-800  p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full">
                          <Trophy className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 dark:text-white">
                        {badge.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {badge.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                        Earned {new Date(badge.earnedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Certifications;
