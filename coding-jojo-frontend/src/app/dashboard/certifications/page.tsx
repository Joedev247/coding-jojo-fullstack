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
      <div className="flex items-center justify-center h-48 p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
          <p className="text-gray-600 text-sm">Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 p-4">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  const certificates = certificationData?.certificates || [];
  const badges = certificationData?.badges || [];

  return (
    <>
      <div className="space-y-4 p-4">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Certifications & Badges
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Track your achievements and earned certifications
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 ">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">
                  Total Certificates
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {certificates.length}
                </p>
              </div>
            </div>
          </div>

        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 ">
                <Trophy className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">
                  Badges Earned
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {badges.length}
                </p>
              </div>
            </div>
          </div>

        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 ">
                <Star className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">
                  Skills Earned
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {certificationData?.stats.earned || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveTab("certificates")}
              className={`py-2 px-3  font-medium text-xs transition-all duration-300 ${
                activeTab === "certificates"
                  ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              Certificates ({certificates.length})
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`py-2 px-3  font-medium text-xs transition-all duration-300 ${
                activeTab === "badges"
                  ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              Badges ({badges.length})
            </button>
          </nav>
        </div>

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-xs mb-2">No certificates yet</p>
                <p className="text-gray-500 text-sm">
                  Complete courses to earn certificates
                </p>
              </div>
            ) : (
              certificates.map((certificate) => (
                <div key={certificate.id} className="group relative">
                  <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <div className="mb-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-2 text-gray-800">
                        {certificate.course}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3">
                        Course Certificate
                      </p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center justify-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle className="h-3 w-3 text-blue-600" />
                          <span>Grade: {certificate.grade}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2 justify-center">
                        <button className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white text-xs rounded transition-colors">
                          <Download className="h-3 w-3" />
                          Download
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded transition-colors">
                          <Share2 className="h-3 w-3" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-xs mb-2">No badges earned yet</p>
                <p className="text-gray-500 text-sm">
                  Complete courses and achievements to earn badges
                </p>
              </div>
            ) : (
              badges.map((badge) => (
                <div key={badge.id} className="group relative">
                  <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <div className="mb-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-2 text-gray-800">
                        {badge.name}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3">
                        {badge.description}
                      </p>
                      <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
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
