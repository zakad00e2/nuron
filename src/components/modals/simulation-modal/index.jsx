import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import PhetSimulationEmbed from "@components/PhetSimulationEmbed";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

const API_SIMULATIONS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/simulations";

const SimulationModal = ({ show, handleModal, externalSimulations, initialIndex = 0 }) => {
    const { language } = useLanguage();
    const [simulations, setSimulations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Cache mechanism
    const [cache, setCache] = useState(null);

    useEffect(() => {
        if (show) {
            if (externalSimulations && externalSimulations.length > 0) {
                // Map external simulations (from BooksPage) to internal format
                const mapped = externalSimulations.map(item => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    url: item.websiteUrl // Map websiteUrl to url
                }));
                setSimulations(mapped);
                setCurrentIndex(initialIndex);
                setLoading(false);
                return;
            }

            if (cache) {
                setSimulations(cache);
                setCurrentIndex(0);
                return;
            }
            fetchSimulations();
        }
    }, [show, language, externalSimulations, initialIndex]);

    const fetchSimulations = async () => {
        setLoading(true);
        setError(null);
        
        // Demo data definition
        const demoData = [
            { 
                id: 1, 
                title: language === 'ar' ? 'بناء ذرة' : 'Build an Atom', 
                description: language === 'ar' ? 'ابنِ ذرات من البروتونات والنيوترونات والإلكترونات.' : 'Build atoms from protons, neutrons, and electrons.',
                url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html' 
            },
            { 
                id: 2, 
                title: language === 'ar' ? 'أدوات بناء الدوائر' : 'Circuit Construction Kit', 
                description: language === 'ar' ? 'مختبر إلكترونيات افتراضي لبناء الدوائر.' : 'An electronics lab for building circuits.',
                url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html' 
            },
            { 
                id: 3, 
                title: language === 'ar' ? 'أشكال الجزيئات' : 'Molecule Shapes', 
                description: language === 'ar' ? 'استكشف أشكال الجزيئات وكيف تتغير.' : 'Explore molecule shapes and how they change.',
                url: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html' 
            }
        ];

        try {
            const response = await fetch(`${API_SIMULATIONS_URL}?locale=${language}`);
            if (!response.ok) {
                console.warn(`API returned ${response.status}, using demo data.`);
                setSimulations(demoData);
                setCache(demoData);
                return;
            }
            const data = await response.json();
            if (data && data.data) {
                const mappedSimulations = data.data.map(item => ({
                    id: item.id,
                    title: item.title || item.attributes?.title,
                    description: item.description || item.attributes?.description,
                    url: item.url || item.attributes?.url,
                    // Add other fields as needed based on actual API response
                }));
                setSimulations(mappedSimulations);
                setCache(mappedSimulations);
            } else {
                setSimulations(demoData);
                setCache(demoData);
            }
        } catch (err) {
            console.error("Error fetching simulations:", err);
            // Fallback/Demo data if API fails
            setSimulations(demoData);
            setCache(demoData);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % simulations.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + simulations.length) % simulations.length);
    };

    const handleClose = () => {
        handleModal();
    };

    const currentSim = simulations[currentIndex];

    return (
        <Modal
            className="rn-popup-modal simulation-modal-wrapper"
            show={show}
            onHide={handleClose}
            centered
            size="xl"
            dialogClassName="modal-90w"
        >
            {show && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <i className="feather-x" />
                </button>
            )}
            
            <Modal.Body style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                {loading ? (
                    <div className="text-center" style={{ margin: 'auto' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : simulations.length > 0 ? (
                    <div className="simulation-view h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">{currentSim.title}</h4>
                        </div>
                        
                        <div className="flex-grow-1" style={{ minHeight: '600px' }}>
                            <PhetSimulationEmbed url={currentSim.url} title={currentSim.title} />
                        </div>

                        <div className="flipbook-controls d-flex justify-content-center align-items-center gap-3 mt-4">
                            <button 
                                className="btn btn-icon btn-primary-alta" 
                                onClick={handlePrev}
                                disabled={simulations.length <= 1}
                            >
                                <i className="feather-chevron-left" />
                            </button>
                            <span className="page-indicator">
                                {currentIndex + 1} / {simulations.length}
                            </span>
                            <button 
                                className="btn btn-icon btn-primary-alta" 
                                onClick={handleNext}
                                disabled={simulations.length <= 1}
                            >
                                <i className="feather-chevron-right" />
                            </button>
                        </div>
                        {currentSim.description && (
                            <p className="text-center mt-3 mb-0">{currentSim.description}</p>
                        )}
                    </div>
                ) : (
                    <div className="text-center" style={{ margin: 'auto' }}>
                        <p>{language === 'ar' ? 'لا توجد محاكاة متاحة حاليا.' : 'No simulations available at the moment.'}</p>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

SimulationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    externalSimulations: PropTypes.array,
    initialIndex: PropTypes.number,
};

export default SimulationModal;
