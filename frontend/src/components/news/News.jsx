"use client";

import { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Newspaper,
  ExternalLink,
  Calendar,
  Star,
  Users,
  Sparkles,
  Search,
  X,
  Filter,
  ArrowRight,
} from "lucide-react";
import Pagination from "@/components/common/CardPagination";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [newsItems, setNewsItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile(); // 커스텀 훅 사용

  const filteredNews = newsItems.filter(
    (item) =>
      (activeCategory === "all" || item.categoryId === activeCategory) &&
      (searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const itemsPerPage = isMobile ? 3 : 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [
    { id: "all", name: "전체", icon: <Star className="h-4 w-4 mr-1.5" /> },
    {
      id: "news",
      name: "보도자료",
      icon: <Newspaper className="h-4 w-4 mr-1.5" />,
    },
    {
      id: "service",
      name: "서비스",
      icon: <Sparkles className="h-4 w-4 mr-1.5" />,
    },
    {
      id: "recruitment",
      name: "채용",
      icon: <Users className="h-4 w-4 mr-1.5" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/data/news.json");
        const json = await res.json();
        const sorted = json.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setNewsItems(sorted);
      } catch (err) {
        console.error("뉴스 데이터를 불러오는 중 오류 발생:", err);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (isMobile) {
      setFilterMenuOpen(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-2 md:py-8 font-ibm">
      <motion.div
        className="backdrop-blur-md p-1 mb-2 md:mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
      >
        {/* 모바일용 필터 UI */}
        <div className="md:hidden flex mb-1 space-x-2">
          <Button
            onClick={toggleFilterMenu}
            className="flex-grow bg-yellow-300 shadow-sm textwhite hover:bg-yellow-400"
            variant="outline"
          >
            <div className="flex items-center">
              {categories.find((c) => c.id === activeCategory)?.icon || (
                <Filter className="h-4 w-4 mr-2" />
              )}
              {categories.find((c) => c.id === activeCategory)?.name ||
                "카테고리"}
            </div>
          </Button>

          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 bg-white border-sky-100 focus-visible:ring-sky-400 w-full"
              placeholder="뉴스 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* 모바일용 카테고리 메뉴 */}
        <AnimatePresence>
          {filterMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white rounded-lg shadow-lg border border-gray-200 mb-4 overflow-hidden"
            >
              <div className="p-2 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      activeCategory === category.id ? "default" : "outline"
                    }
                    className={`w-full justify-start text-sm ${
                      activeCategory === category.id
                        ? "bg-yellow-400 text-white hover:bg-yellow-500"
                        : "border-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="flex items-center">
                      {category.icon}
                      {category.name}
                    </div>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 데스크탑용 필터 UI - 원본 유지 */}
        <div className="hidden md:flex md:flex-wrap gap-3 md:justify-between md:items-center">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`min-w-max shadow-md transition-all duration-200 transform hover:scale-105 text-sm px-3 py-2 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-yellow-400 text-white hover:bg-yellow-500"
                    : "border-yellow-200 text-gray-500"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="flex items-center">
                  {category.icon}
                  {category.name}
                </div>
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 bg-white border-sky-100 focus-visible:ring-sky-400"
              placeholder="뉴스 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchTerm}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {filteredNews.length > 0 ? (
            paginatedNews.map((news) => (
              <motion.div
                key={news.id}
                variants={itemVariants}
                layout
                className="h-full"
              >
                {/* 모바일용 카드 디자인 */}
                {isMobile ? (
                  <Card className="h-full flex flex-col overflow-hidden border-sky-100 transition-all duration-300 group bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
                    <div className="flex flex-col h-full">
                      <div className="px-4 pt-4 pb-0">
                        <Badge className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs mb-2">
                          {categories.find((c) => c.id === news.categoryId)
                            ?.name || news.category}
                        </Badge>
                      </div>

                      <CardHeader className="pt-1 px-4 pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base font-semibold text-gray-800 line-clamp-2">
                            {news.title}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-500 text-xs flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {news.date}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="px-4 py-2 flex-grow">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {news.summary || news.content}
                        </p>
                      </CardContent>

                      <CardFooter className="flex justify-end p-3 pt-0">
                        <Button
                          variant="ghost"
                          className="text-sky-600 hover:text-sky-800 hover:bg-sky-100 transition-all p-2 h-auto text-sm"
                          onClick={() => window.open(news.link, "_blank")}
                        >
                          자세히 보기
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ) : (
                  // 데스크탑용 카드 디자인 - 원본 유지
                  <Card className="h-full flex flex-col overflow-hidden border-sky-100 transition-all duration-300 group bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transform">
                    <CardHeader className="bg-blue-400 text-white p-4 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <CardTitle className="transition-transform duration-300 flex items-center text-lg">
                            {news.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <CardDescription className="text-sky-100 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {news.date}
                          </CardDescription>
                          <Badge className="bg-white/20 hover:bg-white/30 text-white">
                            {categories.find((c) => c.id === news.categoryId)
                              ?.name || news.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 flex-grow">
                      <p className="text-gray-700 line-clamp-3 text-sm">
                        {news.summary || news.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end p-4">
                      <Button
                        variant="ghost"
                        className="text-sky-600 hover:text-sky-800 hover:bg-sky-100 transition-all duration-300 group"
                        onClick={() => window.open(news.link, "_blank")}
                      >
                        자세히 보기
                        <ExternalLink className="ml-1 h-4 w-4 transition-all duration-300" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-auto w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-500 mb-4">
                다른 검색어나 카테고리로 다시 시도해보세요.
              </p>
              <Button
                variant="outline"
                className="border-sky-200 text-sky-700"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
              >
                필터 초기화
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </section>
  );
}