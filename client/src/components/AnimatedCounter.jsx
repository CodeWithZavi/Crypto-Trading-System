import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedCounter = ({ value, prefix = "", suffix = "", decimals = 0, className = "" }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            // Parse value if string (remove non-numeric chars except dot)
            const numericValue = typeof value === 'string'
                ? parseFloat(value.toString().replace(/[^0-9.-]+/g, ""))
                : value;

            if (!isNaN(numericValue)) {
                motionValue.set(numericValue);
            }
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                let formattedValue;

                // If decimals is explicitly provided as > 0, use it.
                // Otherwise, use smart formatting for small numbers.
                if (decimals > 0) {
                    formattedValue = latest.toFixed(decimals);
                } else {
                    if (latest === 0) {
                        formattedValue = "0";
                    } else if (latest < 0.0001) {
                        formattedValue = latest.toFixed(8); // Extremely small (PEPE/SHIB)
                    } else if (latest < 0.01) {
                        formattedValue = latest.toFixed(6); // Very small
                    } else if (latest < 1) {
                        formattedValue = latest.toFixed(4); // Sub-dollar
                    } else if (latest < 10) {
                        formattedValue = latest.toFixed(2); // Small dollar
                    } else {
                        formattedValue = Math.floor(latest).toLocaleString(); // Large integer-like (BTC)
                    }
                }

                ref.current.textContent = prefix + formattedValue + suffix;
            }
        });
    }, [springValue, decimals, prefix, suffix]);

    return <span ref={ref} className={className} />;
};

export default AnimatedCounter;
