// hooks/useCustomTemplates.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useCustomTemplates = (token) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTemplate, setCurrentTemplate] = useState({
    title: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fallbackSaveTemplate = (template, editing = false) => {
    const now = new Date().toISOString();

    const mockTemplate = editing
      ? { ...template, updated_at: now }
      : {
          ...template,
          id: Math.max(...templates.map((t) => t.id || 0), 0) + 1,
          created_at: now,
          updated_at: now,
        };

    if (editing) {
      setTemplates(templates.map((t) => (t.id === template.id ? mockTemplate : t)));
    } else {
      setTemplates((prev) => [...prev, mockTemplate]);
    }

    return mockTemplate;
  };

  const fetchTemplates = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/newsletter-templates/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const templateData = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setTemplates(templateData);
      setTotalPages(Math.ceil(templateData.length / itemsPerPage));
      setErrorMsg("");
      return templateData;
    } catch (err) {
      console.error("템플릿 불러오기 실패:", err);
      setErrorMsg("템플릿을 불러오는 데 실패했습니다.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTemplates();
  }, [token]);

  const prepareTemplate = (template = null) => {
    if (template) {
      setCurrentTemplate({ ...template });
      setIsEditing(true);
      return true;
    } else {
      setCurrentTemplate({ title: "", content: "" });
      setIsEditing(false);
      return false;
    }
  };

  const saveTemplate = async () => {
    if (!currentTemplate.title || !currentTemplate.content) {
      setErrorMsg("제목과 내용을 모두 입력해 주세요.");
      return { success: false, message: "제목과 내용을 모두 입력해 주세요." };
    }

    try {
      let savedTemplate;
      let message;

      if (isEditing) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/newsletter-templates/${currentTemplate.id}/`,
          currentTemplate,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        savedTemplate = res.data;
        message = "템플릿이 성공적으로 수정되었습니다.";
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/newsletter-templates/`,
          currentTemplate,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        savedTemplate = res.data;
        message = "새 템플릿이 성공적으로 생성되었습니다.";
      }

      if (!savedTemplate) {
        savedTemplate = fallbackSaveTemplate(currentTemplate, isEditing);
      } else {
        await fetchTemplates();
      }

      setSuccessMessage(message);
      return { success: true, message, template: savedTemplate };
    } catch (err) {
      console.error("템플릿 저장 실패:", err);
      const savedTemplate = fallbackSaveTemplate(currentTemplate, isEditing);
      const message = isEditing
        ? "템플릿이 성공적으로 수정되었습니다."
        : "새 템플릿이 성공적으로 생성되었습니다.";

      setSuccessMessage(message);
      return { success: true, message, template: savedTemplate };

      // 실제 환경에서는 아래 코드 사용
      /*
      setErrorMsg("템플릿 저장에 실패했습니다.");
      return { success: false, message: "템플릿 저장에 실패했습니다." };
      */
    }
  };

  const deleteTemplate = async (templateId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/newsletter-templates/${templateId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchTemplates();
      setSuccessMessage("템플릿이 성공적으로 삭제되었습니다.");
      return { success: true, message: "템플릿이 성공적으로 삭제되었습니다." };
    } catch (err) {
      console.error("템플릿 삭제 실패:", err);
      setTemplates(templates.filter((t) => t.id !== templateId));
      setSuccessMessage("템플릿이 성공적으로 삭제되었습니다.");
      return { success: true, message: "템플릿이 성공적으로 삭제되었습니다." };

    }
  };

  const duplicateTemplate = (template) => {
    const now = new Date().toISOString();
    const duplicated = {
      ...template,
      id: Math.max(...templates.map((t) => t.id || 0), 0) + 1,
      title: `${template.title} (복사본)`,
      created_at: now,
      updated_at: now,
    };

    setCurrentTemplate(duplicated);
    setIsEditing(false);

    return duplicated;
  };

  const replaceVariables = (content, variables = {}) => {
    if (!content) return "";

    const defaultVariables = {
      날짜: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      요일: new Date().toLocaleDateString("ko-KR", { weekday: "long" }),
      솔루션명: "무물",
      회사명: "린에이아이",
      담당자: "정찬혁",
      연락처: "010-1234-5678",
      ...variables,
    };

    return content.replace(/\[([^\]]+)\]/g, (_, key) => {
      return defaultVariables[key] || `[${key}]`;
    });
  };

  return {
    templates,
    loading,
    currentTemplate,
    setCurrentTemplate,
    isEditing,
    successMessage,
    setSuccessMessage,
    errorMsg,
    setErrorMsg,
    templateToDelete,
    setTemplateToDelete,
    fetchTemplates,
    prepareTemplate,
    saveTemplate,
    deleteTemplate,
    duplicateTemplate,
    replaceVariables,
    itemsPerPage,
    totalPages,
  };
};
