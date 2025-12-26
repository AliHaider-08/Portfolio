import { useAtom } from 'jotai';
import {
  educationQueryAtom,
  educationActiveTypesAtom,
  educationSelectedTypeAtom,
  educationActiveTagsAtom,
  educationSortByAtom,
  educationViewModeAtom,
  educationShowStatsAtom,
  selectedEducationAtom,
  isSearchFocusedAtom
} from '../atoms/atoms';

export const useEducationState = () => {
  const [query, setQuery] = useAtom(educationQueryAtom);
  const [activeTypes, setActiveTypes] = useAtom(educationActiveTypesAtom);
  const [selectedType, setSelectedType] = useAtom(educationSelectedTypeAtom);
  const [activeTags, setActiveTags] = useAtom(educationActiveTagsAtom);
  const [sortBy, setSortBy] = useAtom(educationSortByAtom);
  const [viewMode, setViewMode] = useAtom(educationViewModeAtom);
  const [showStats, setShowStats] = useAtom(educationShowStatsAtom);
  const [selected, setSelected] = useAtom(selectedEducationAtom);
  const [isSearchFocused, setIsSearchFocused] = useAtom(isSearchFocusedAtom);

  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setQuery('');
    setActiveTags([]);
    setActiveTypes(['Degree', 'Certification', 'Course']);
    setSortBy('newest');
    setSelectedType('Degree');
  };

  return {
    query,
    setQuery,
    activeTypes,
    setActiveTypes,
    selectedType,
    setSelectedType,
    activeTags,
    setActiveTags,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showStats,
    setShowStats,
    selected,
    setSelected,
    isSearchFocused,
    setIsSearchFocused,
    toggleTag,
    resetFilters
  };
};
