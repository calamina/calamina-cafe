export const useProjectFilters = () => {
  const reset = document.querySelector(".reset");
  const projects = document.querySelectorAll(".project");
  const buttons = document.querySelectorAll(".tagSelector");

  reset?.addEventListener("click", () => {
    for (const button of buttons) button.classList.remove("active");
    for (const project of projects) project.classList.remove("discrete");
  });

  for (const button of buttons) {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      setTags();
    });
  }

  function setTags() {
    const activeButtons = document.querySelectorAll(
      ".tagSelector.active",
    ) as NodeListOf<HTMLButtonElement>;

    const tags: string[] = activeButtons
      .values()
      .map((elt) => elt.value)
      .toArray();

    if (!tags.length) {
      for (const project of projects)
        project.classList.remove("discrete");
      return;
    }

    for (const project of projects) {
      const hasTag = project.classList
        .values()
        .some((tag) => tags?.includes(tag));
      if (!hasTag) project.classList.add("discrete");
      else project.classList.remove("discrete");
    }
  }
}