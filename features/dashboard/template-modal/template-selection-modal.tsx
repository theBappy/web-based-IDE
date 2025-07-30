"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ChevronRight,
  Search,
  Code,
  Server,
  Globe,
  Zap,
  Clock,
  Check,
  Plus,
} from "lucide-react";
import Image from "next/image";

type TemplateSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  }) => void;
};
interface TemplateOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  popularity: number;
  tags: string[];
  features: string[];
  category: "frontend" | "backend" | "fullstack";
}

const templates: TemplateOption[] = [
  {
    id: "react",
    name: "React",
    description:
      "A JavaScript framework for building user interfaces with component-based architecture",
    icon: "/react.svg",
    color: "#61dafb",
    popularity: 5,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Component-Based", "Virtual DOM", "JSX Support"],
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "A React framework with server-side rendering, API routes, and full-stack capabilities",
    icon: "/nextjs-icon.svg",
    color: "#000000",
    popularity: 5,
    tags: ["SSR", "Fullstack", "React"],
    features: ["File-based Routing", "API Routes", "Image Optimization"],
    category: "fullstack",
  },
  {
    id: "express",
    name: "Express",
    description:
      "A minimal and flexible Node.js web application framework for backend APIs and servers",
    icon: "/expressjs-icon.svg",
    color: "#303030",
    popularity: 4,
    tags: ["Backend", "Node.js", "API"],
    features: ["Middleware Support", "Routing", "Minimalist"],
    category: "backend",
  },
  {
    id: "vue",
    name: "Vue",
    description:
      "A progressive JavaScript framework for building interactive user interfaces",
    icon: "/vuejs-icon.svg",
    color: "#42b883",
    popularity: 4,
    tags: ["UI", "Frontend", "JavaScript"],
    features: [
      "Reactive Data Binding",
      "Single File Components",
      "Lightweight",
    ],
    category: "frontend",
  },
  {
    id: "angular",
    name: "Angular",
    description:
      "A TypeScript-based frontend framework developed by Google for large-scale applications",
    icon: "/angular-2.svg",
    color: "#dd1b16",
    popularity: 4,
    tags: ["Frontend", "TypeScript", "Enterprise"],
    features: ["Dependency Injection", "RxJS", "Two-Way Binding"],
    category: "frontend",
  },
  {
    id: "hono",
    name: "Hono",
    description:
      "A lightweight, fast, and modern web framework for building backend applications in JavaScript/TypeScript",
    icon: "/hono.svg",
    color: "#ff6f61",
    popularity: 3,
    tags: ["Backend", "Edge-ready", "Minimal"],
    features: ["Middleware Support", "Tiny Footprint", "Fast Routing"],
    category: "backend",
  },
];

export const TemplateSelectionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TemplateSelectionModalProps) => {
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");
  const [projectName, setProjectName] = useState("");

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const filteredTemplate = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      category === "all" || template.category === category;

    return matchesSearch && matchesCategory;
  });

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setStep("configure");
    }
  };

  const handleBack = () => {
    setStep("select");
  };
  const handleCreateProject = () => {
    if (selectedTemplate) {
      const templateMap: Record<
        string,
        "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"
      > = {
        react: "REACT",
        nextjs: "NEXTJS",
        vue: "VUE",
        hono: "HONO",
        angular: "ANGULAR",
        express: "EXPRESS",
      };
      const template = templates.find((t) => t.id === selectedTemplate)
      onSubmit({
        title: projectName || `New ${template?.name} Project`,
        template: templateMap[selectedTemplate] || 'REACT',
        description: template?.description,
      })
    }
    onClose()
    setStep('select')
    setSelectedTemplate(null)
    setProjectName('')
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
          setStep("select");
          setSelectedTemplate(null);
          setProjectName("");
        }}
      >
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {step === "select" ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                  <Plus size={24} className="text-blue-600" />
                  Select a Template
                </DialogTitle>
                <DialogDescription>
                  Choose a template create your new playground
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 outline-none"
                      size={18}
                    />
                    <Input
                      placeholder="Search template..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Tabs
                    defaultValue="all"
                    className="w-full sm:w-auto"
                    onValueChange={(value) => setCategory(value as any)}
                  >
                    <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="frontend">Frontend</TabsTrigger>
                      <TabsTrigger value="backend">Backend</TabsTrigger>
                      <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <RadioGroup
                  value={selectedTemplate || ""}
                  onValueChange={handleSelectTemplate}
                >
                  <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplate.length > 0 ? (
                      filteredTemplate.map((template) => (
                        <div
                          key={template.id}
                          className={`relative flex p-6 border rounded-lg cursor-pointer
                          transition-all duration-300 hover:scale-[1.02]
                          ${
                            selectedTemplate === template.id
                              ? "border-[#3f6ce9]  shadow-[0_0_0_1px_#E93F3F,0_8px_20px_rgba(233,63,63,0.15)]"
                              : "hover:border-[#3f50e9] shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                          }`}
                          onClick={() => handleSelectTemplate(template.id)}
                        >
                          <div className="absolute top-4 right-4 flex gap-1">
                            {renderStars(template.popularity)}
                          </div>

                          {selectedTemplate === template.id && (
                            <div className="absolute top-2 left-2 bg-[#5177f5] text-white rounded-full p-1">
                              <Check size={14} />
                            </div>
                          )}

                          <div className="flex gap-4">
                            <div
                              className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full"
                              style={{ backgroundColor: `${template.color}15` }}
                            >
                              <Image
                                src={template.icon || "/placeholder.svg"}
                                alt={`${template.name} icon`}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>

                            <div className="flex flex-col">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold">
                                  {template.name}
                                </h3>
                                <div className="flex gap-1">
                                  {template.category === "frontend" && (
                                    <Code size={14} className="text-blue-500" />
                                  )}
                                  {template.category === "backend" && (
                                    <Server
                                      size={14}
                                      className="text-green-500"
                                    />
                                  )}
                                  {template.category === "fullstack" && (
                                    <Globe
                                      size={14}
                                      className="text-purple-500"
                                    />
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3">
                                {template.description}
                              </p>

                              <div className="flex flex-wrap gap-2 mt-auto">
                                {template.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-1 border rounded-2xl"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <RadioGroupItem
                            value={template.id}
                            id={template.id}
                            className="sr-only"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                        <Search size={48} className="text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium">
                          No templates found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    )}
                  </div>
                </RadioGroup>
                <div className="flex justify-between gap-3 mt-4 pt-4 border-t">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span className="">
                      Estimated setup time:{" "}
                      {selectedTemplate ? "2-5 minutes" : "Select a template"}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleContinue}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Continue
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-500">
                  Configure Your Project
                </DialogTitle>
                <DialogDescription>
                  {templates.find((t) => t.id === selectedTemplate)?.name}{" "}
                  Project Configuration
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="project-name">Project Name</label>
                  <Input
                    placeholder="my-project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    id="project-name"
                  />
                </div>
                <div className="p-4 shadow-[0_0_0_1px_#E93F3F,0_8px_20px_rgba(233,63,63,0.15)] rounded-lg border">
                  <h3 className="font-medium mb-2">
                    Selected Template Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {templates
                      .find((t) => t.id === selectedTemplate)
                      ?.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Zap size={14} className="text-blue-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-3 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleCreateProject}
                >
                  Create Project
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
