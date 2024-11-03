"use client";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useSeason from "../../seasons/hooks/useSeason";
import useCategory from "../../categories/hooks/useCategry";
import useLeaderboard from "../../leaderboard/hooks/useLeaderboard";
import { ICategory } from "../../categories/interface/categories.interface";
import { ILeaderboardResponse } from "../../leaderboard/interface/leaderboard.interface";

interface DashboardFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: { categoryId: number; seasonId: number }) => void;
}

export default function DashboardForm({ isOpen, onClose, onSave }: DashboardFormProps) {
    const { seasons, handleGetAllSeasons } = useSeason();
    const { categories, handleGetAllCategories } = useCategory();
    const { leaderboards, handleFindLeaderboardsBySeasonAndCategory, handleGetAllLeaderboards } = useLeaderboard();

    const [formData, setFormData] = useState({
        categoryId: 0,
        seasonId: 0,
    });
    const [availableCategories, setAvailableCategories] = useState<ICategory[]>([]);

    // Cargar datos iniciales
    useEffect(() => {
        
           
                handleGetAllSeasons(),
                handleGetAllCategories(),
                handleGetAllLeaderboards()
    }, []);

    // Filtrar categorías basadas en la temporada seleccionada
    useEffect(() => {
        if (!formData.seasonId || !categories || !leaderboards || leaderboards.length === 0) {
            setAvailableCategories([]);
            return;
        }
    
        // Obtener categorías únicas para la temporada seleccionada
        const categoriesInSeason = new Set(
            leaderboards
                .filter((lb: ILeaderboardResponse) => lb.seasonId === formData.seasonId)
                .map(lb => lb.categoryId)
        );
        console.log(categoriesInSeason);
    
        // Filtrar las categorías disponibles
        const filteredCategories = categories.filter(
            category => categoriesInSeason.has(category.categoryId ?? 0)
        );
    
        setAvailableCategories(filteredCategories);
        
        // Reset category selection if current category is not available in new season
        if (!filteredCategories.some(cat => cat.categoryId === formData.categoryId)) {
            setFormData(prev => ({
                ...prev,
                categoryId: 0
            }));
        }
    }, [formData.seasonId, categories, leaderboards]);
    

    const handleSeasonChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            seasonId: parseInt(value)
        }));
        console.log(availableCategories);
        console.log(leaderboards);
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            categoryId: parseInt(value)
        }));
    };

    const handleSubmit = async () => {
        if (formData.seasonId && formData.categoryId) {
            await handleFindLeaderboardsBySeasonAndCategory(formData.seasonId, formData.categoryId);
            onSave(formData);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="text-xl font-bold">
                            Tabla de posiciones
                        </ModalHeader>
                        <ModalBody className="gap-4">
                            <Select
                                label="Temporada"
                                placeholder="Selecciona una temporada"
                                selectedKeys={formData.seasonId ? [formData.seasonId.toString()] : []}
                                onChange={(e) => handleSeasonChange(e.target.value)}
                                className="w-full"
                            >
                                {(seasons ?? []).map((season) => (
                                    <SelectItem
                                        key={season.seasonId?.toString() ?? "0"}
                                        value={season.seasonId}
                                    >
                                        {season.seasonName}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                label="Categoría"
                                placeholder={formData.seasonId ? "Selecciona una categoría" : "Primero selecciona una temporada"}
                                selectedKeys={formData.categoryId ? [formData.categoryId.toString()] : []}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                isDisabled={!formData.seasonId}
                                className="w-full"
                            >
                                {availableCategories.map((category) => (
                                    <SelectItem
                                        key={category.categoryId?.toString() ?? "0"}
                                        value={category.categoryId}
                                    >
                                        {category.categoryName}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button 
                                color="primary" 
                                onPress={handleSubmit}
                                isDisabled={!formData.seasonId || !formData.categoryId}
                            >
                                Filtrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}