import gsap from "gsap";
import { useTextAnimation } from "../useTextAnimation";
import { useButtonAnimation } from "../useButtonAnimation";

export function useExperienceAnimation() {
  const { animateTextSlideUp, animateWaveText } = useTextAnimation();
  const { animatePrimaryButtonIntro } = useButtonAnimation();

  const animateExperience = (tl) => {
    const experience = document.querySelector("#experience");
    if (!experience) return;

    const imgContainer = experience.querySelector("#experience-img-container");
    const img = experience.querySelector("#experience-img-container img");
    const heading = experience.querySelector("h2");
    const subtext = experience.querySelector(".self-start p");
    const rightHeading = experience.querySelector(".experience-right-content h3, .self-end h3");
    const rightText = experience.querySelector(".experience-right-content p, .self-end p");
    const primaryButton = experience.querySelector(".primary-button");

    if (imgContainer) {
      gsap.fromTo(
        imgContainer,
        { x: -150 },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: experience,
            containerAnimation: tl,
            scrub: true,
            start: "left right",
            end: "left left",
          },
        },
      );
    }

    if (img) {
      gsap.fromTo(
        img,
        { x: 300 },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: experience,
            containerAnimation: tl,
            scrub: true,
            start: "left right",
            end: "left left",
          },
        },
      );
    }

    if (heading) {
      animateWaveText(heading, {
        trigger: experience,
        containerAnimation: tl,
        start: "left 5%",
        staggerEnter: 0.04,
        staggerExit: 0,
      });
    }

    if (subtext) {
      animateTextSlideUp(subtext, {
        trigger: experience,
        containerAnimation: tl,
        start: "left 5%",
        duration: 0.5,
      });
    }

    if (rightHeading) {
      animateWaveText(rightHeading, {
        trigger: experience,
        containerAnimation: tl,
        start: "left 5%",
        staggerEnter: 0.04,
        staggerExit: 0,
      });
    }

    if (rightText) {
      animateTextSlideUp(rightText, {
        trigger: experience,
        containerAnimation: tl,
        start: "left 5%",
        duration: 0.5,
      });
    }

    if (primaryButton) {
      animatePrimaryButtonIntro(primaryButton, {
        trigger: experience,
        containerAnimation: tl,
        start: "left 5%",
      });
    }
  };

  const animateExperienceTimeline = () => {
    const mobileExperience = document.querySelector("#mobile-experience");
    if (mobileExperience) {
      const mHeading = mobileExperience.querySelector("h2");
      const mSubtext = mobileExperience.querySelector(".space-y-3 > p");
      const mRightHeading = mobileExperience.querySelector(".space-y-2 h3");
      const mRightText = mobileExperience.querySelector(".space-y-2 p");
      const mBtn = mobileExperience.querySelector(".primary-button");

      if (mHeading) {
        animateWaveText(mHeading, {
          trigger: mobileExperience,
          start: "top 85%",
          staggerEnter: 0.04,
          staggerExit: 0,
        });
      }
      if (mSubtext) {
        animateTextSlideUp(mSubtext, {
          trigger: mobileExperience,
          start: "top 85%",
          duration: 0.5,
        });
      }
      if (mRightHeading) {
        animateWaveText(mRightHeading, {
          trigger: mobileExperience,
          start: "top 85%",
          staggerEnter: 0.04,
          staggerExit: 0,
        });
      }
      if (mRightText) {
        animateTextSlideUp(mRightText, {
          trigger: mobileExperience,
          start: "top 85%",
          duration: 0.5,
        });
      }
      if (mBtn) {
        animatePrimaryButtonIntro(mBtn, {
          trigger: mobileExperience,
          start: "top 85%",
        });
      }
    }

    const items = document.querySelectorAll("#experience-timeline .experience-item");

    gsap.set(items, { y: 40, opacity: 0 });

    items.forEach((item) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const imgs = document.querySelectorAll("#experience-timeline .experience-item img");
    if (imgs.length > 0) {
      gsap.set(imgs, { scale: 1.1, opacity: 0 });
      imgs.forEach((img) => {
        gsap.to(img, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }

    const shuttle = document.querySelector("#experience-timeline img[alt='Shuttle']");
    if (shuttle) {
      gsap.fromTo(
        shuttle,
        { y: 120 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: "#experience-timeline",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  };

  return { animateExperience, animateExperienceTimeline };
}
