import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import PhetSimulationEmbed from "@components/PhetSimulationEmbed";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";
import dynamic from 'next/dynamic';

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

const API_SIMULATIONS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/simulations";

const SimulationModal = ({ show, handleModal, externalSimulations, initialIndex = 0 }) => {
    const { language } = useLanguage();
    const [simulations, setSimulations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pdfPages, setPdfPages] = useState({}); // Store page counts for PDFs
    const [scale, setScale] = useState(1.0); // Zoom scale state

    // Cache mechanism
    const [cache, setCache] = useState(null);

    useEffect(() => {
        import('react-pdf').then(({ pdfjs }) => {
            pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        });
    }, []);

    const onDocumentLoadSuccess = (pdfUrl, { numPages }) => {
        setPdfPages(prev => ({ ...prev, [pdfUrl]: numPages }));
        
        // Expand simulations array with individual pages
        setSimulations(prevSims => {
            const newSims = [];
            prevSims.forEach(sim => {
                if ((sim.type === 'pdf' || (sim.url && sim.url.endsWith('.pdf'))) && sim.url === pdfUrl) {
                    for (let i = 1; i <= numPages; i++) {
                        newSims.push({
                            ...sim,
                            id: `${sim.id}-page-${i}`,
                            pdfPageNumber: i,
                            isPdfPage: true,
                            title: `${sim.title} - ${language === 'ar' ? 'صفحة' : 'Page'} ${i}`
                        });
                    }
                } else {
                    newSims.push(sim);
                }
            });
            return newSims;
        });
    };

    useEffect(() => {
        if (show) {
            const coverPage = {
                id: 'cover-page',
                title: language === 'ar' ? 'مرحباً بكم' : 'Welcome',
                isCover: true
            };

            if (externalSimulations && externalSimulations.length > 0) {
                // Map external simulations (from BooksPage) to internal format
                const mapped = externalSimulations.map(item => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    url: item.websiteUrl // Map websiteUrl to url
                }));

                const pdfPage = {
                    id: 'pdf-cv',
                    title: language === 'ar' ? 'وثيقة PDF' : 'PDF Document',
                    description: language === 'ar' ? 'عرض وثيقة PDF تفاعلية.' : 'Interactive PDF document view.',
                    url: '/cv.pdf',
                    type: 'pdf'
                };

                setSimulations([coverPage, ...mapped, pdfPage]);
                setCurrentIndex(initialIndex + 1);
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
        
        const coverPage = {
            id: 'cover-page',
            title: language === 'ar' ? 'مرحباً بكم' : 'Welcome',
            isCover: true
        };

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
            },
            { 
                id: 4, 
                title: language === 'ar' ? 'وثيقة PDF' : 'PDF Document', 
                description: language === 'ar' ? 'عرض وثيقة PDF تفاعلية.' : 'Interactive PDF document view.',
                url: '/cv.pdf',
                type: 'pdf'
            }
        ];

        try {
            const response = await fetch(`${API_SIMULATIONS_URL}?locale=${language}`);
            if (!response.ok) {
                console.warn(`API returned ${response.status}, using demo data.`);
                setSimulations([coverPage, ...demoData]);
                setCache([coverPage, ...demoData]);
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
                setSimulations([coverPage, ...mappedSimulations]);
                setCache([coverPage, ...mappedSimulations]);
            } else {
                setSimulations([coverPage, ...demoData]);
                setCache([coverPage, ...demoData]);
            }
        } catch (err) {
            console.error("Error fetching simulations:", err);
            // Fallback/Demo data if API fails
            setSimulations([coverPage, ...demoData]);
            setCache([coverPage, ...demoData]);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % simulations.length);
        setScale(1.0); // Reset zoom on page change
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + simulations.length) % simulations.length);
        setScale(1.0); // Reset zoom on page change
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const handleResetZoom = () => setScale(1.0);

    const handleClose = () => {
        handleModal();
        setScale(1.0);
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
            
            <Modal.Body style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
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
                            {currentSim.isPdfPage && (
                                <div className="zoom-controls d-flex gap-2">
                                    <button className="btn btn-sm btn-primary-alta" onClick={handleZoomOut} title="Zoom Out">
                                        <i className="feather-minus" />
                                    </button>
                                    <button className="btn btn-sm btn-primary-alta" onClick={handleResetZoom} title="Reset Zoom">
                                        {Math.round(scale * 100)}%
                                    </button>
                                    <button className="btn btn-sm btn-primary-alta" onClick={handleZoomIn} title="Zoom In">
                                        <i className="feather-plus" />
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-grow-1" style={{ height: '450px', maxHeight: '450px', overflow: 'hidden', position: 'relative' }}>
                            {currentSim.isCover ? (
                                <div className="simulation-cover-bg" style={{ textAlign: 'center', padding: '20px', borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', maxWidth: '100%' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src="/غلاف_كتاب_رسالة_في_العقل.jpg" 
                                            alt="رسالة في العقل - الفارابي" 
                                            style={{ 
                                                borderRadius: '10px', 
                                                objectFit: 'contain', 
                                                maxWidth: '100%', 
                                                maxHeight: '400px',
                                                height: 'auto',
                                                width: 'auto'
                                            }} 
                                        />
                                    </div>
                                    {/* <h2 style={{ color: 'var(--color-heading)', marginBottom: '10px' }}>{language === 'ar' ? 'استكشف وتعلم' : 'Explore and Learn'}</h2>
                                    <p style={{ fontSize: '16px', color: 'var(--color-body)', maxWidth: '600px', margin: '0 auto' }}>
                                        {language === 'ar' ? 'مجموعة من المحاكاة التفاعلية للعلوم والرياضيات.' : 'A collection of interactive simulations for science and math.'}
                                    </p> */}
                                </div>
                            ) : currentSim.isPdfPage ? (
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    height: '100%', 
                                    alignItems: scale > 1 ? 'flex-start' : 'center', 
                                    overflow: 'auto' 
                                }}>
                                    <Document
                                        file={currentSim.url}
                                        loading={<div className="text-center mt-5"><div className="spinner-border text-primary" /></div>}
                                    >
                                        <Page 
                                            pageNumber={currentSim.pdfPageNumber} 
                                            height={450}
                                            scale={scale}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    </Document>
                                </div>
                            ) : (currentSim.type === 'pdf' || (currentSim.url && currentSim.url.endsWith('.pdf'))) ? (
                                <div style={{ display: 'none' }}>
                                    <Document
                                        file={currentSim.url}
                                        onLoadSuccess={(data) => onDocumentLoadSuccess(currentSim.url, data)}
                                    >
                                    </Document>
                                    <div className="text-center mt-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading PDF...</span>
                                        </div>
                                        <p className="mt-2">Loading PDF pages...</p>
                                    </div>
                                </div>
                            ) : (
                                <PhetSimulationEmbed url={currentSim.url} title={currentSim.title} height="450px" />
                            )}
                        </div>

                        <div className="flipbook-controls d-flex justify-content-center align-items-center gap-3 mt-4">
                            <button 
                                className="btn btn-icon btn-primary-alta" 
                                onClick={language === 'ar' ? handleNext : handlePrev}
                                disabled={simulations.length <= 1}
                            >
                                <i className={language === 'ar' ? "feather-chevron-right" : "feather-chevron-left"} />
                            </button>
                            <span className="page-indicator">
                                {currentIndex + 1} / {simulations.length}
                            </span>
                            <button 
                                className="btn btn-icon btn-primary-alta" 
                                onClick={language === 'ar' ? handlePrev : handleNext}
                                disabled={simulations.length <= 1}
                            >
                                <i className={language === 'ar' ? "feather-chevron-left" : "feather-chevron-right"} />
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
