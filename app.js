(() => {
  // ===== AUTHENTICATION & ROLE MANAGEMENT =====
  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem("bb_logged_in");
    if (!isLoggedIn) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  };

  const currentUser = {
    role: localStorage.getItem("bb_user_role") || "customer",
    username: localStorage.getItem("bb_username") || "User",
    workspace: localStorage.getItem("bb_workspace") || "Default",
  };

  // Permissions for different roles
  const PERMISSIONS = {
    jeweler: ["crm", "inventory", "project", "dashboard", "report", "admin", "design", "approval"],
    customer: ["design", "project", "approval"],
  };

  const hasPermission = (feature) => {
    const features = PERMISSIONS[currentUser.role] || [];
    return features.includes(feature);
  };

  // Check authentication on load
  if (!checkAuth()) return;

  // ===== SETUP ROLE-BASED UI =====
  const setupRoleBasedUI = () => {
    // Update profile information
    const profileName = document.getElementById("profile-name");
    const profileRole = document.getElementById("profile-role");
    const profileAvatar = document.getElementById("profile-avatar");
    const workspaceDisplay = document.getElementById("workspace-display");
    const userRoleDisplay = document.getElementById("user-role-display");

    if (profileName) profileName.textContent = currentUser.username;
    if (profileRole) profileRole.textContent = currentUser.role === "jeweler" ? "Jeweler" : "Customer";
    if (profileAvatar) profileAvatar.textContent = currentUser.username.substring(0, 2).toUpperCase();
    if (workspaceDisplay) workspaceDisplay.textContent = `Workspace: ${currentUser.workspace}`;
    if (userRoleDisplay) userRoleDisplay.textContent = `Role: ${currentUser.role === "jeweler" ? "Jeweler" : "Customer"}`;

    // Hide/show nav items and tabs based on permissions
    const navItems = document.querySelectorAll(".nav-item[data-feature]");
    const screenTabs = document.querySelectorAll(".screen-tab[data-visibility]");

    navItems.forEach((item) => {
      const feature = item.dataset.feature;
      item.style.display = hasPermission(feature) ? "flex" : "none";
    });

    screenTabs.forEach((tab) => {
      const visibility = tab.dataset.visibility;
      if (visibility === "store-only") {
        tab.style.display = currentUser.role === "jeweler" ? "block" : "none";
      }
    });

    // Hide Create menu items based on permissions
    const dropdownItems = document.querySelectorAll("[data-screen-link]");
    dropdownItems.forEach((item) => {
      const visibility = item.dataset.visibility;
      if (visibility === "store-only") {
        item.style.display = currentUser.role === "jeweler" ? "block" : "none";
      }
    });
  };

  setupRoleBasedUI();

  const body = document.body;
  const screenTabs = Array.from(document.querySelectorAll(".screen-tab"));
  const screens = Array.from(document.querySelectorAll(".screen"));
  const moduleLabel = document.getElementById("active-module");
  const screenLabel = document.getElementById("active-screen-label");
  const inspectorTabs = Array.from(document.querySelectorAll(".inspector-tab"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
  const drawerTabs = Array.from(document.querySelectorAll(".drawer-tab"));
  const drawerPanels = Array.from(document.querySelectorAll(".drawer-panel"));
  const roleToggles = Array.from(document.querySelectorAll("[data-role-toggle]"));
  const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));
  const toast = document.getElementById("toast");
  const searchWrap = document.getElementById("global-search-wrap");
  const searchInput = document.getElementById("global-search");
  const searchResults = document.getElementById("search-results");
  const searchClear = document.querySelector(".search-clear");
  const railToggle = document.querySelector("[data-rail-toggle]");
  const vaultPinInput = document.getElementById("vault-pin-input");
  const vaultPinSubmit = document.getElementById("vault-pin-submit");
  const vaultPinClear = document.getElementById("vault-pin-clear");
  const vaultPinStatus = document.getElementById("vault-pin-status");
  const vaultPinReset = document.getElementById("vault-pin-reset");
  const vaultSearch = document.getElementById("vault-search");
  const panelToggles = Array.from(document.querySelectorAll("[data-panel-toggle]"));
  const studioCanvas = document.querySelector(".studio-canvas");
  const intakeChatThread = document.getElementById("intake-chat-thread");
  const intakeMessageInput = document.getElementById("intake-message");
  const intakeSend = document.getElementById("intake-send");
  const attachRef = document.getElementById("attach-ref");
  const saveConceptBtn = document.getElementById("save-concept");
  const promptInput = document.getElementById("intake-prompt");
  const promptSave = document.getElementById("prompt-save");
  const promptGenerate = document.getElementById("prompt-generate");
  const referenceUpload = document.getElementById("reference-upload");
  const referenceUrl = document.getElementById("reference-url");
  const referenceUrlAdd = document.getElementById("reference-url-add");
  const referenceGallery = document.getElementById("reference-gallery");
  const referenceCount = document.getElementById("reference-count");
  const dropZone = document.querySelector(".drop-zone");
  const sketchCanvas = document.getElementById("sketch-canvas");
  const sketchToolButtons = Array.from(document.querySelectorAll("[data-sketch-tool]"));
  const sketchColorButtons = Array.from(document.querySelectorAll("[data-sketch-color]"));
  const sketchSizeInput = document.querySelector("[data-sketch-size]");
  const sketchClear = document.querySelector("[data-sketch-clear]");
  const sketchSave = document.querySelector("[data-sketch-save]");
  const approvalStatus = document.getElementById("approval-status");
  const approvalGate = document.getElementById("approval-gate");
  const approvalSnapshot = document.getElementById("approval-snapshot");
  const designReadyToggle = document.getElementById("design-ready-toggle");
  const approve3dBtn = document.getElementById("approve-3d-btn");
  const requestChangesBtn = document.getElementById("request-changes-btn");
  const approveModal = document.getElementById("approve-modal");
  const approveConfirm = document.getElementById("approve-confirm");
  const approveComment = document.getElementById("approve-comment");
  const conversionQueue = document.getElementById("conversion-queue");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1600);
  };

  const PROJECT_ID = "RM-1042";
  const storageKey = (key) => `${key}:${PROJECT_ID}`;
  const STORAGE = {
    rail: "bb_rail_state",
    chat: "bb_intake_chat_v1",
    references: "bb_references_v1",
    approval: "bb_approval_v1",
    designReady: "bb_design_ready_v1",
    conceptSaved: "bb_concept_saved_v1",
    queue: "bb_3d_queue_v1",
    prompt: "bb_prompt_v1",
    sketch: "bb_sketch_v1",
    vaultPin: "bb_vault_pin_v1",
    vaultPinAt: "bb_vault_pin_at_v1",
  };
  const DEFAULT_VAULT_PIN = "2468";
  const VAULT_SESSION_MS = 15 * 60 * 1000;

  const updateModuleActive = (moduleName) => {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.module === moduleName);
    });
    if (moduleLabel) {
      moduleLabel.textContent = moduleName || "System";
    }
  };

  const updateInspectorContext = (screenId) => {
    tabPanels.forEach((panel) => {
      const blocks = Array.from(panel.querySelectorAll(".context-block"));
      const match = blocks.find((block) => block.dataset.screen === screenId);
      const fallback = blocks.find((block) => block.dataset.screen === "default");
      blocks.forEach((block) => {
        block.hidden = true;
      });
      if (match) {
        match.hidden = false;
      } else if (fallback) {
        fallback.hidden = false;
      }
    });
  };

  const setActiveScreen = (screenId) => {
    screens.forEach((screen) => {
      screen.classList.toggle("active", screen.dataset.screen === screenId);
    });
    screenTabs.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.screenTarget === screenId);
    });
    const activeScreen = screens.find((screen) => screen.dataset.screen === screenId);
    if (activeScreen) {
      const title = activeScreen.dataset.title || activeScreen.querySelector("h2")?.textContent || screenId;
      if (screenLabel) screenLabel.textContent = title;
      updateModuleActive(activeScreen.dataset.module || "System");
    }
    body.dataset.activeScreen = screenId;
    updateInspectorContext(screenId);
    if (screenId === "screen-4") {
      window.setTimeout(resizeSketchCanvas, 50);
    }
  };

  const isVisibleForRole = (element, role) => {
    if (!element) return false;
    const visibility = element.dataset.visibility;
    const isDesigner = role === "store" || role === "designer";
    if (visibility === "store-only" && !isDesigner) return false;
    if (visibility === "customer-only" && isDesigner) return false;
    return true;
  };

  const ensureVisibleScreen = () => {
    const role = body.dataset.role || "store";
    const active = screens.find((screen) => screen.classList.contains("active"));
    if (active && isVisibleForRole(active, role)) return;
    const first = screenTabs.find((tab) => {
      const target = screens.find((screen) => screen.dataset.screen === tab.dataset.screenTarget);
      return isVisibleForRole(tab, role) && isVisibleForRole(target, role);
    });
    if (first) setActiveScreen(first.dataset.screenTarget);
  };

  const readJson = (key, fallback) => {
    try {
      const raw = localStorage.getItem(storageKey(key));
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    localStorage.setItem(storageKey(key), JSON.stringify(value));
  };

  const defaultChat = [
    { role: "ai", text: "Tell me the vibe and the must-have.", ts: Date.now() - 600000 },
    { role: "user", text: "Minimal, oval, hidden halo.", ts: Date.now() - 570000 },
    { role: "ai", text: "Metal preference?", ts: Date.now() - 560000 },
    { role: "user", text: "White or platinum.", ts: Date.now() - 550000 },
    { role: "system", text: "System: Proposed prong update for durability.", ts: Date.now() - 540000 },
  ];

  let chatMessages = readJson(STORAGE.chat, defaultChat);
  let references = readJson(STORAGE.references, []);
  let approvalState = readJson(STORAGE.approval, {
    status: "Pending",
    snapshotLocked: false,
    comment: "",
  });
  let designReady = readJson(STORAGE.designReady, false);
  let conceptSaved = readJson(STORAGE.conceptSaved, false);
  let queueItems = readJson(STORAGE.queue, []);
  let promptValue = readJson(STORAGE.prompt, "");

  const renderChat = () => {
    if (!intakeChatThread) return;
    intakeChatThread.innerHTML = "";
    chatMessages.forEach((message) => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${message.role}`;
      bubble.textContent = message.text;
      if (message.role === "system") {
        bubble.dataset.visibility = "store-only";
      }
      intakeChatThread.appendChild(bubble);
    });
    intakeChatThread.scrollTop = intakeChatThread.scrollHeight;
  };

  const addChatMessage = (role, text) => {
    chatMessages.push({ role, text, ts: Date.now() });
    writeJson(STORAGE.chat, chatMessages);
    renderChat();
    updateSearchResults(searchInput?.value || "");
  };

  const handleChatSend = () => {
    if (!intakeMessageInput) return;
    const text = intakeMessageInput.value.trim();
    if (!text) return;
    addChatMessage("user", text);
    intakeMessageInput.value = "";
    window.setTimeout(() => {
      addChatMessage("ai", "Got it. Want to refine the stone size or band width?");
    }, 600);
  };

  const renderReferences = () => {
    if (!referenceGallery || !referenceCount) return;
    referenceGallery.innerHTML = "";
    referenceCount.textContent = `${references.length} items`;
    if (!references.length) {
      const empty = document.createElement("div");
      empty.className = "reference-item";
      empty.innerHTML = '<div class="reference-thumb">No refs yet</div>';
      referenceGallery.appendChild(empty);
      updateApprovalUI();
      return;
    }
    references.forEach((ref) => {
      const item = document.createElement("div");
      item.className = `reference-item${ref.primary ? " primary" : ""}`;
      item.dataset.id = ref.id;
      const thumb = document.createElement("div");
      thumb.className = "reference-thumb";
      thumb.style.backgroundImage = `url("${ref.src}")`;
      thumb.style.backgroundSize = "cover";
      thumb.style.backgroundPosition = "center";
      const meta = document.createElement("div");
      meta.className = "reference-meta";
      const actions = document.createElement("div");
      actions.className = "reference-actions";
      const primaryBtn = document.createElement("button");
      primaryBtn.className = "btn ghost";
      primaryBtn.type = "button";
      primaryBtn.dataset.action = "primary";
      primaryBtn.textContent = ref.primary ? "Primary" : "Set primary";
      const removeBtn = document.createElement("button");
      removeBtn.className = "btn ghost";
      removeBtn.type = "button";
      removeBtn.dataset.action = "remove";
      removeBtn.textContent = "Remove";
      actions.appendChild(primaryBtn);
      actions.appendChild(removeBtn);
      const note = document.createElement("input");
      note.type = "text";
      note.className = "reference-note";
      note.placeholder = "Add note";
      note.value = ref.note || "";
      note.addEventListener("change", () => {
        ref.note = note.value;
        writeJson(STORAGE.references, references);
      });
      meta.appendChild(actions);
      meta.appendChild(note);
      item.appendChild(thumb);
      item.appendChild(meta);
      referenceGallery.appendChild(item);
    });
    updateApprovalUI();
  };

  const addReference = (src) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
    references.push({ id, src, note: "", primary: references.length === 0 });
    writeJson(STORAGE.references, references);
    renderReferences();
  };

  const setPrimaryReference = (id) => {
    references = references.map((ref) => ({ ...ref, primary: ref.id === id }));
    writeJson(STORAGE.references, references);
    renderReferences();
  };

  const removeReference = (id) => {
    references = references.filter((ref) => ref.id !== id);
    if (references.length && !references.some((ref) => ref.primary)) {
      references[0].primary = true;
    }
    writeJson(STORAGE.references, references);
    renderReferences();
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const updateApprovalUI = () => {
    if (!approvalStatus || !approvalGate || !approvalSnapshot || !approve3dBtn) return;
    const hasReference = references.length > 0;
    const eligible = (hasReference || conceptSaved) && designReady;
    approvalStatus.textContent = approvalState.status;
    approvalStatus.classList.remove("status-approved", "status-changes", "status-pending");
    if (approvalState.status === "Approved") approvalStatus.classList.add("status-approved");
    if (approvalState.status === "Changes Requested") approvalStatus.classList.add("status-changes");
    if (approvalState.status === "Pending") approvalStatus.classList.add("status-pending");
    approvalSnapshot.textContent = approvalState.snapshotLocked ? "Snapshot: locked" : "Snapshot: not locked";
    if (approvalState.status === "Approved") {
      approvalGate.textContent = "Approved and queued";
    } else if (approvalState.status === "Changes Requested") {
      approvalGate.textContent = "Changes requested";
    } else if (eligible) {
      approvalGate.textContent = "Ready to approve";
    } else if (!designReady) {
      approvalGate.textContent = "Designer must mark ready";
    } else {
      approvalGate.textContent = "Add reference or save concept";
    }
    approve3dBtn.disabled = !eligible || approvalState.status === "Approved";
    if (designReadyToggle) {
      designReadyToggle.textContent = designReady ? "Ready" : "Mark ready";
    }
    if (saveConceptBtn) {
      saveConceptBtn.textContent = conceptSaved ? "Concept saved" : "Save concept";
    }
  };

  const renderQueue = () => {
    if (!conversionQueue) return;
    conversionQueue.innerHTML = "";
    if (!queueItems.length) {
      const empty = document.createElement("div");
      empty.className = "list-item";
      empty.textContent = "No items yet";
      conversionQueue.appendChild(empty);
      return;
    }
    queueItems.forEach((item) => {
      const row = document.createElement("div");
      row.className = "list-item";
      row.textContent = `${item.title} - ${item.status}`;
      conversionQueue.appendChild(row);
    });
  };

  const approveFor3d = (comment = "") => {
    approvalState = {
      status: "Approved",
      snapshotLocked: true,
      comment,
    };
    writeJson(STORAGE.approval, approvalState);
    queueItems.unshift({
      id: `${Date.now()}`,
      title: "RM-1042 - Oval Solitaire",
      status: "Queued",
    });
    writeJson(STORAGE.queue, queueItems);
    renderQueue();
    updateApprovalUI();
    showToast("Approval saved");
  };

  const requestChanges = () => {
    approvalState = {
      ...approvalState,
      status: "Changes Requested",
      snapshotLocked: false,
    };
    writeJson(STORAGE.approval, approvalState);
    updateApprovalUI();
    showToast("Changes requested");
  };

  const openModal = () => {
    if (!approveModal) return;
    approveModal.classList.add("open");
    approveModal.setAttribute("aria-hidden", "false");
    if (approveComment) approveComment.focus();
  };

  const closeModal = () => {
    if (!approveModal) return;
    approveModal.classList.remove("open");
    approveModal.setAttribute("aria-hidden", "true");
    if (approveComment) approveComment.value = "";
  };

  const updateSearchResults = (query) => {
    if (!searchResults) return;
    const value = query.trim().toLowerCase();
    if (!value) {
      searchResults.hidden = true;
      return;
    }
    const isDesigner = body.dataset.role === "store" || body.dataset.role === "designer";
    const canSee = (item) => {
      if (!item.visibility) return true;
      if (item.visibility === "store-only") return isDesigner;
      if (item.visibility === "customer-only") return !isDesigner;
      return true;
    };
    const groups = [
      {
        title: "Projects",
        items: [
          { label: "RM-1042 - Oval Solitaire", screen: "screen-2" },
          { label: "RM-1043 - Pendant", screen: "screen-2" },
        ],
      },
      {
        title: "Designs",
        items: [
          { label: "Oval Solitaire v3", screen: "screen-9" },
          { label: "Minimal Band v2", screen: "screen-9" },
        ],
      },
      {
        title: "Vault",
        items: [
          { label: "Certificate - Oval Solitaire", screen: "screen-vault" },
          { label: "Invoice - RM-1042", screen: "screen-vault" },
          { label: "CAD export - RM-1042", screen: "screen-vault", visibility: "store-only" },
        ],
      },
      {
        title: "Chat",
        items: chatMessages
          .filter((message) => message.role !== "system")
          .map((message) => ({ label: `"${message.text}"`, screen: "screen-4" })),
      },
    ];
    const filtered = groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => canSee(item) && item.label.toLowerCase().includes(value)),
      }))
      .filter((group) => group.items.length);

    searchResults.innerHTML = "";
    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "result-group";
      empty.innerHTML = '<div class="result-title">Results</div><div class="result-item">No matches</div>';
      searchResults.appendChild(empty);
      searchResults.hidden = false;
      return;
    }
    filtered.forEach((group) => {
      const groupEl = document.createElement("div");
      groupEl.className = "result-group";
      const title = document.createElement("div");
      title.className = "result-title";
      title.textContent = group.title;
      groupEl.appendChild(title);
      group.items.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "result-item";
        btn.textContent = item.label;
        btn.dataset.screenLink = item.screen;
        groupEl.appendChild(btn);
      });
      searchResults.appendChild(groupEl);
    });
    searchResults.hidden = false;
  };

  const updateVaultState = () => {
    const savedPin = readJson(STORAGE.vaultPin, null) || DEFAULT_VAULT_PIN;
    if (!readJson(STORAGE.vaultPin, null)) {
      writeJson(STORAGE.vaultPin, savedPin);
    }
    const unlockedAt = readJson(STORAGE.vaultPinAt, 0);
    const isActive = Date.now() - unlockedAt < VAULT_SESSION_MS;
    body.dataset.vault = isActive ? "unlocked" : "locked";
    if (vaultPinStatus && !isActive) {
      vaultPinStatus.textContent = "";
    }
    if (isActive) {
      window.clearTimeout(updateVaultState._t);
      updateVaultState._t = window.setTimeout(() => {
        body.dataset.vault = "locked";
        if (vaultPinStatus) vaultPinStatus.textContent = "Session expired";
      }, VAULT_SESSION_MS - (Date.now() - unlockedAt));
    }
  };

  const sketchState = {
    tool: "draw",
    color: "#1f2a2e",
    size: 4,
    drawing: false,
    lastX: 0,
    lastY: 0,
  };

  let sketchCtx = null;

  const resizeSketchCanvas = () => {
    if (!sketchCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = sketchCanvas.getBoundingClientRect();
    sketchCanvas.width = rect.width * dpr;
    sketchCanvas.height = rect.height * dpr;
    sketchCtx = sketchCanvas.getContext("2d");
    sketchCtx.setTransform(1, 0, 0, 1, 0, 0);
    sketchCtx.scale(dpr, dpr);
    const saved = readJson(STORAGE.sketch, null);
    if (saved) {
      const image = new Image();
      image.onload = () => {
        sketchCtx.clearRect(0, 0, rect.width, rect.height);
        sketchCtx.drawImage(image, 0, 0, rect.width, rect.height);
      };
      image.src = saved;
    }
  };

  const setSketchTool = (tool) => {
    sketchState.tool = tool;
    sketchToolButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.sketchTool === tool);
    });
  };

  const setSketchColor = (color) => {
    sketchState.color = color;
    sketchColorButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.sketchColor === color);
    });
  };

  const startSketch = (event) => {
    if (!sketchCanvas || !sketchCtx) return;
    sketchState.drawing = true;
    const rect = sketchCanvas.getBoundingClientRect();
    sketchState.lastX = event.clientX - rect.left;
    sketchState.lastY = event.clientY - rect.top;
  };

  const drawSketch = (event) => {
    if (!sketchState.drawing || !sketchCtx || !sketchCanvas) return;
    const rect = sketchCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sketchCtx.lineCap = "round";
    sketchCtx.lineJoin = "round";
    sketchCtx.lineWidth = sketchState.size;
    if (sketchState.tool === "erase") {
      sketchCtx.globalCompositeOperation = "destination-out";
      sketchCtx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      sketchCtx.globalCompositeOperation = "source-over";
      sketchCtx.strokeStyle = sketchState.color;
    }
    sketchCtx.beginPath();
    sketchCtx.moveTo(sketchState.lastX, sketchState.lastY);
    sketchCtx.lineTo(x, y);
    sketchCtx.stroke();
    sketchState.lastX = x;
    sketchState.lastY = y;
  };

  const endSketch = () => {
    if (!sketchCanvas || !sketchCtx) return;
    sketchState.drawing = false;
  };

  const saveSketch = () => {
    if (!sketchCanvas) return;
    writeJson(STORAGE.sketch, sketchCanvas.toDataURL("image/png"));
  };

  screenTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveScreen(btn.dataset.screenTarget);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-screen-link]");
    if (!target) return;
    const screenId = target.dataset.screenLink;
    if (screenId) setActiveScreen(screenId);
  });

  inspectorTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      inspectorTabs.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      const panel = document.querySelector(`.tab-panel[data-tab="${target}"]`);
      if (panel) panel.classList.add("active");
    });
  });

  drawerTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      drawerTabs.forEach((btn) => btn.classList.remove("active"));
      drawerPanels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      const panel = document.querySelector(`.drawer-panel[data-tab="${target}"]`);
      if (panel) panel.classList.add("active");
    });
  });

  roleToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      roleToggles.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      body.dataset.role = btn.dataset.roleToggle;
      ensureVisibleScreen();
    });
  });

  const updateStudioPanels = () => {
    if (!studioCanvas) return;
    const libraryOpen = document.querySelector('.studio-pane[data-panel="library"]')?.classList.contains("is-open");
    const inspectorOpen = document.querySelector('.studio-pane[data-panel="inspector"]')?.classList.contains("is-open");
    studioCanvas.classList.toggle("show-library", Boolean(libraryOpen));
    studioCanvas.classList.toggle("show-inspector", Boolean(inspectorOpen));
  };

  panelToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const target = toggle.dataset.panelToggle;
      const panel = document.querySelector(`.studio-pane[data-panel="${target}"]`);
      if (panel) {
        panel.classList.toggle("is-open");
        updateStudioPanels();
      }
    });
  });

  if (railToggle) {
    railToggle.addEventListener("click", () => {
      const next = body.dataset.rail === "collapsed" ? "expanded" : "collapsed";
      body.dataset.rail = next;
      localStorage.setItem(storageKey(STORAGE.rail), next);
    });
  }

  if (intakeSend) {
    intakeSend.addEventListener("click", handleChatSend);
  }

  if (intakeMessageInput) {
    intakeMessageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleChatSend();
      }
    });
  }

  // ===== NEW CHAT INTERFACE HANDLERS =====
  const sketchModal = document.getElementById("sketch-modal");
  const sketchSendBtn = document.getElementById("sketch-send-btn");
  const sketchCanvasFull = document.getElementById("sketch-canvas-full");
  const sketchCanvasInline = document.getElementById("sketch-canvas-inline");
  const chatUploadBtn = document.getElementById("chat-upload-btn");
  const chatSketchBtn = document.getElementById("chat-sketch-btn");
  const chatFileUpload = document.getElementById("chat-file-upload");
  const sidebarUpload = document.getElementById("sidebar-upload");
  const designBrief = document.getElementById("design-brief");
  const approveDesignBtn = document.getElementById("approve-design-btn");

  // Open sketch modal
  if (chatSketchBtn) {
    chatSketchBtn.addEventListener("click", () => {
      if (sketchModal) {
        sketchModal.hidden = false;
        // Initialize canvas if needed
        if (sketchCanvasFull && !sketchCanvasFull.hasEventListener) {
          initSketchCanvas(sketchCanvasFull);
          sketchCanvasFull.hasEventListener = true;
        }
      }
    });
  }

  // Close sketch modal
  const closeSketchModal = () => {
    if (sketchModal) sketchModal.hidden = true;
  };

  const closeButtons = document.querySelectorAll("[data-close-modal]");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeSketchModal);
  });

  // Send sketch to chat
  if (sketchSendBtn) {
    sketchSendBtn.addEventListener("click", () => {
      if (sketchCanvasFull) {
        addSketchToChat(sketchCanvasFull);
        closeSketchModal();
        showToast("Sketch added to conversation");
      }
    });
  }

  // Image action buttons in chat
  const imageActionButtons = document.querySelectorAll("[data-action]");
  imageActionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const action = btn.dataset.action;
      if (action === "sketch") {
        if (sketchModal) sketchModal.hidden = false;
      } else if (action === "upload") {
        if (chatFileUpload) chatFileUpload.click();
      } else if (action === "clear") {
        if (sketchCanvasInline) clearCanvas(sketchCanvasInline);
      } else if (action === "refine") {
        if (intakeMessageInput) {
          intakeMessageInput.placeholder = "Describe how you'd like to refine this design...";
          intakeMessageInput.focus();
        }
      } else if (action === "variations") {
        showToast("Generating variations...");
      } else if (action === "approve") {
        if (approveDesignBtn) {
          approveDesignBtn.disabled = false;
          showToast("Ready to approve. Click Approve for 3D when ready.");
        }
      }
    });
  });

  // Approve for 3D button - navigate to 3D Studio
  if (approveDesignBtn) {
    approveDesignBtn.addEventListener("click", () => {
      approveFor3d("Design approved from Design Studio");
      showToast("Design approved! Navigating to 3D Studio...");
      window.setTimeout(() => {
        setActiveScreen("screen-3d");
      }, 600);
    });
  }

  // Chat file upload
  if (chatFileUpload) {
    chatFileUpload.addEventListener("change", async (event) => {
      const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
      for (const file of files) {
        const src = await readFileAsDataUrl(file);
        addImageToChat(src, "user");
      }
      chatFileUpload.value = "";
    });
  }

  if (chatUploadBtn) {
    chatUploadBtn.addEventListener("click", () => {
      if (chatFileUpload) chatFileUpload.click();
    });
  }

  // Sidebar upload
  if (sidebarUpload) {
    sidebarUpload.addEventListener("change", async (event) => {
      const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
      const sidebarReferences = document.getElementById("sidebar-references");
      for (const file of files) {
        const src = await readFileAsDataUrl(file);
        const img = document.createElement("img");
        img.src = src;
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          addImageToChat(src, "reference");
        });
        sidebarReferences?.appendChild(img);
      }
      sidebarUpload.value = "";
    });
  }

  // Helper functions for new chat interface
  const addSketchToChat = (canvas) => {
    if (!intakeChatThread) return;
    const chatMessage = document.createElement("div");
    chatMessage.className = "chat-message user-message";
    
    const imageDiv = document.createElement("div");
    imageDiv.className = "message-image";
    
    const newCanvas = document.createElement("canvas");
    newCanvas.className = "inline-sketch";
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const ctx = newCanvas.getContext("2d");
    const sourceCtx = canvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0);
    
    imageDiv.appendChild(newCanvas);
    chatMessage.appendChild(imageDiv);
    
    intakeChatThread.appendChild(chatMessage);
    intakeChatThread.scrollTop = intakeChatThread.scrollHeight;
  };

  const addImageToChat = (src, role = "user") => {
    if (!intakeChatThread) return;
    const chatMessage = document.createElement("div");
    chatMessage.className = `chat-message ${role}-message`;
    
    const imageDiv = document.createElement("div");
    imageDiv.className = "message-image";
    
    const img = document.createElement("img");
    img.src = src;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "12px";
    img.style.border = "1px solid var(--line)";
    
    imageDiv.appendChild(img);
    chatMessage.appendChild(imageDiv);
    
    intakeChatThread.appendChild(chatMessage);
    intakeChatThread.scrollTop = intakeChatThread.scrollHeight;
  };

  const initSketchCanvas = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let tool = "draw";
    let color = "#1f2a2e";
    let size = 4;

    const updateToolFromButtons = () => {
      const activeTools = sketchToolButtons.filter((b) => b.classList.contains("active"));
      if (activeTools.length) tool = activeTools[0].dataset.sketchTool;
      
      const activeColors = sketchColorButtons.filter((b) => b.classList.contains("active"));
      if (activeColors.length) color = activeColors[0].dataset.sketchColor;
    };

    sketchToolButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sketchToolButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateToolFromButtons();
      });
    });

    sketchColorButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sketchColorButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateToolFromButtons();
      });
    });

    if (sketchSizeInput) {
      sketchSizeInput.addEventListener("change", () => {
        size = Number(sketchSizeInput.value);
      });
    }

    const sketchClearBtn = document.querySelector("[data-sketch-clear]");
    if (sketchClearBtn) {
      sketchClearBtn.addEventListener("click", () => clearCanvas(canvas));
    }

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX || e.touches?.[0]?.clientX) - rect.left,
        y: (e.clientY || e.touches?.[0]?.clientY) - rect.top,
      };
    };

    const draw = (x, y) => {
      if (!isDrawing) return;
      if (tool === "erase") {
        ctx.clearRect(x - size / 2, y - size / 2, size, size);
      } else {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const startDraw = (e) => {
      isDrawing = true;
      updateToolFromButtons();
      const pos = getPos(e);
      draw(pos.x, pos.y);
    };

    const moveDraw = (e) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      draw(pos.x, pos.y);
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", moveDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseout", stopDraw);
    
    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchmove", moveDraw);
    canvas.addEventListener("touchend", stopDraw);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  if (attachRef && referenceUpload) {
    attachRef.addEventListener("click", () => referenceUpload.click());
  }

  if (saveConceptBtn) {
    saveConceptBtn.addEventListener("click", () => {
      conceptSaved = !conceptSaved;
      writeJson(STORAGE.conceptSaved, conceptSaved);
      updateApprovalUI();
      showToast(conceptSaved ? "Concept saved" : "Concept cleared");
    });
  }

  if (designReadyToggle) {
    designReadyToggle.addEventListener("click", () => {
      designReady = !designReady;
      writeJson(STORAGE.designReady, designReady);
      updateApprovalUI();
      showToast(designReady ? "Design marked ready" : "Design marked not ready");
    });
  }

  if (approve3dBtn) {
    approve3dBtn.addEventListener("click", () => {
      if (approve3dBtn.disabled) return;
      openModal();
    });
  }

  if (approveConfirm) {
    approveConfirm.addEventListener("click", () => {
      const comment = approveComment?.value?.trim() || "";
      approveFor3d(comment);
      closeModal();
    });
  }

  if (requestChangesBtn) {
    requestChangesBtn.addEventListener("click", () => requestChanges());
  }

  if (referenceUpload) {
    referenceUpload.addEventListener("change", async (event) => {
      const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
      for (const file of files) {
        const src = await readFileAsDataUrl(file);
        addReference(src);
      }
      referenceUpload.value = "";
    });
  }

  if (referenceUrlAdd && referenceUrl) {
    referenceUrlAdd.addEventListener("click", () => {
      const url = referenceUrl.value.trim();
      if (!url) return;
      addReference(url);
      referenceUrl.value = "";
    });
  }

  if (referenceUrl) {
    referenceUrl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && referenceUrlAdd) {
        event.preventDefault();
        referenceUrlAdd.click();
      }
    });
  }

  if (dropZone) {
    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("is-dragover");
    });
    dropZone.addEventListener("dragleave", () => dropZone.classList.remove("is-dragover"));
    dropZone.addEventListener("drop", async (event) => {
      event.preventDefault();
      dropZone.classList.remove("is-dragover");
      const files = Array.from(event.dataTransfer?.files || []).filter((file) => file.type.startsWith("image/"));
      for (const file of files) {
        const src = await readFileAsDataUrl(file);
        addReference(src);
      }
    });
  }

  if (referenceGallery) {
    referenceGallery.addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      if (!action) return;
      const item = event.target.closest(".reference-item");
      if (!item) return;
      const id = item.dataset.id;
      if (!id) return;
      if (action === "primary") setPrimaryReference(id);
      if (action === "remove") removeReference(id);
    });
  }

  if (promptInput) {
    promptInput.value = promptValue;
    promptInput.addEventListener("input", () => {
      promptValue = promptInput.value;
      writeJson(STORAGE.prompt, promptValue);
    });
  }

  if (promptSave) {
    promptSave.addEventListener("click", () => {
      writeJson(STORAGE.prompt, promptValue || "");
      showToast("Prompt saved");
    });
  }

  if (promptGenerate) {
    promptGenerate.addEventListener("click", () => {
      showToast("Concept generated");
    });
  }

  if (sketchCanvas) {
    resizeSketchCanvas();
    window.addEventListener("resize", resizeSketchCanvas);
    sketchCanvas.addEventListener("pointerdown", (event) => {
      sketchCanvas.setPointerCapture(event.pointerId);
      startSketch(event);
    });
    sketchCanvas.addEventListener("pointermove", drawSketch);
    sketchCanvas.addEventListener("pointerup", () => {
      endSketch();
      saveSketch();
    });
    sketchCanvas.addEventListener("pointerleave", endSketch);
  }

  sketchToolButtons.forEach((btn) => {
    btn.addEventListener("click", () => setSketchTool(btn.dataset.sketchTool));
  });

  sketchColorButtons.forEach((btn) => {
    btn.addEventListener("click", () => setSketchColor(btn.dataset.sketchColor));
  });

  if (sketchSizeInput) {
    sketchSizeInput.addEventListener("input", () => {
      sketchState.size = Number(sketchSizeInput.value);
    });
  }

  if (sketchClear) {
    sketchClear.addEventListener("click", () => {
      if (!sketchCanvas || !sketchCtx) return;
      const rect = sketchCanvas.getBoundingClientRect();
      sketchCtx.clearRect(0, 0, rect.width, rect.height);
      writeJson(STORAGE.sketch, "");
      showToast("Sketch cleared");
    });
  }

  if (sketchSave) {
    sketchSave.addEventListener("click", () => {
      saveSketch();
      showToast("Sketch saved");
    });
  }

  if (searchResults) {
    searchResults.addEventListener("click", (event) => {
      if (event.target.closest(".result-item")) {
        closeSearchResults();
      }
    });
  }

  if (vaultPinSubmit && vaultPinInput) {
    vaultPinSubmit.addEventListener("click", () => {
      const pin = vaultPinInput.value.trim();
      const savedPin = readJson(STORAGE.vaultPin, DEFAULT_VAULT_PIN);
      if (pin === savedPin) {
        writeJson(STORAGE.vaultPinAt, Date.now());
        updateVaultState();
        if (vaultPinStatus) vaultPinStatus.textContent = "Unlocked";
        vaultPinInput.value = "";
        showToast("Vault unlocked");
      } else if (vaultPinStatus) {
        vaultPinStatus.textContent = "Incorrect PIN";
      }
    });
  }

  if (vaultPinInput) {
    vaultPinInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && vaultPinSubmit) {
        event.preventDefault();
        vaultPinSubmit.click();
      }
    });
  }

  if (vaultPinClear && vaultPinInput) {
    vaultPinClear.addEventListener("click", () => {
      vaultPinInput.value = "";
      if (vaultPinStatus) vaultPinStatus.textContent = "";
    });
  }

  if (vaultPinReset) {
    vaultPinReset.addEventListener("click", () => {
      const isDesigner = body.dataset.role === "store" || body.dataset.role === "designer";
      if (!isDesigner) return;
      writeJson(STORAGE.vaultPin, DEFAULT_VAULT_PIN);
      writeJson(STORAGE.vaultPinAt, 0);
      updateVaultState();
      if (vaultPinStatus) vaultPinStatus.textContent = "PIN reset to 2468";
      showToast("PIN reset");
    });
  }

  if (vaultSearch) {
    vaultSearch.addEventListener("input", () => {
      const query = vaultSearch.value.trim().toLowerCase();
      document.querySelectorAll(".file-card").forEach((card) => {
        const name = card.querySelector(".file-name")?.textContent?.toLowerCase() || "";
        const visible = isVisibleForRole(card, body.dataset.role || "store");
        card.style.display = visible && (!query || name.includes(query)) ? "grid" : "none";
      });
    });
  }

  const closeDropdowns = () => {
    dropdowns.forEach((dd) => dd.classList.remove("open"));
  };

  const closeSearchResults = () => {
    if (searchResults) searchResults.hidden = true;
  };

  const handleSearchInput = () => {
    if (!searchInput || !searchWrap) return;
    const value = searchInput.value.trim();
    searchWrap.classList.toggle("has-text", value.length > 0);
    updateSearchResults(value);
  };

  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim()) updateSearchResults(searchInput.value);
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      handleSearchInput();
      searchInput.focus();
    });
  }

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector("[data-dropdown-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const wasOpen = dd.classList.contains("open");
      closeDropdowns();
      if (!wasOpen) dd.classList.add("open");
    });
  });

  document.addEventListener("click", (event) => {
    closeDropdowns();
    if (searchWrap && !searchWrap.contains(event.target)) {
      closeSearchResults();
    }
    if (approveModal && event.target.closest("[data-modal-close]")) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && key === "k") {
      event.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
        if (searchInput.value.trim()) updateSearchResults(searchInput.value);
      }
    }
    if ((event.ctrlKey || event.metaKey) && key === "s") {
      event.preventDefault();
      showToast("Version snapshot saved");
    }
    if (["v", "o", "p", "m"].includes(key)) {
      const tool = document.querySelector(`.tool-btn[data-key="${key.toUpperCase()}"]`);
      if (tool) {
        tool.classList.add("active");
        window.setTimeout(() => tool.classList.remove("active"), 300);
      }
    }
    if (event.key === "Escape") {
      closeDropdowns();
      closeSearchResults();
      closeModal();
    }
  });

  const savedRail = localStorage.getItem(storageKey(STORAGE.rail));
  if (savedRail) body.dataset.rail = savedRail;

  // ===== LOGOUT HANDLER =====
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("bb_logged_in");
      localStorage.removeItem("bb_user_role");
      localStorage.removeItem("bb_username");
      localStorage.removeItem("bb_workspace");
      window.location.href = "login.html";
    });
  }

  // ===== IMMEDIATE 3D RING VISUALIZATION =====
  
  let canvasInitialized = false;
  let animationId;
  let rotation = 0;
  
  // Create immediate ring visualization
  const createImmediateRing = () => {
    if (canvasInitialized) return;
    
    console.log('🎯 Creating immediate ring visualization...');
    
    const canvas = document.getElementById("viewport-3d");
    if (!canvas) {
      console.log('❌ Canvas not found');
      return;
    }
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.background = '#2a2a2a';
    
    const ctx = canvas.getContext('2d');
    canvasInitialized = true;
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw ring with 3D effect
      drawRing(ctx, centerX, centerY, rotation);
      
      // Update rotation
      rotation += 0.02;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    console.log('✅ Ring visualization started!');
  };
  
  const drawRing = (ctx, centerX, centerY, rotation) => {
    // Main ring
    const ringRadius = 80;
    const ringThickness = 20;
    
    // Create gradient for 3D effect
    const gradient = ctx.createRadialGradient(
      centerX, centerY, ringRadius - ringThickness,
      centerX, centerY, ringRadius + ringThickness
    );
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#B8860B');
    gradient.addColorStop(1, '#8B7355');
    
    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, 2 * Math.PI);
    ctx.lineWidth = ringThickness;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    // Draw inner shadow for depth
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius - ringThickness/2, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.stroke();
    
    // Draw center diamond
    const diamondSize = 25;
    const diamondX = centerX + Math.cos(rotation * 2) * 5; // Slight movement
    const diamondY = centerY + Math.sin(rotation * 2) * 3;
    
    // Diamond gradient
    const diamondGradient = ctx.createRadialGradient(
      diamondX, diamondY, 0,
      diamondX, diamondY, diamondSize
    );
    diamondGradient.addColorStop(0, '#87CEEB');
    diamondGradient.addColorStop(0.7, '#4682B4');
    diamondGradient.addColorStop(1, '#191970');
    
    // Draw diamond
    ctx.beginPath();
    ctx.moveTo(diamondX, diamondY - diamondSize);
    ctx.lineTo(diamondX + diamondSize/2, diamondY);
    ctx.lineTo(diamondX, diamondY + diamondSize);
    ctx.lineTo(diamondX - diamondSize/2, diamondY);
    ctx.closePath();
    ctx.fillStyle = diamondGradient;
    ctx.fill();
    
    // Sparkle effect
    ctx.fillStyle = '#FFF';
    ctx.fillRect(diamondX - 2, diamondY - 8, 4, 2);
    ctx.fillRect(diamondX - 8, diamondY - 2, 2, 4);
    
    // Draw small gems around ring
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * 2 * Math.PI + rotation;
      const gemX = centerX + Math.cos(angle) * ringRadius;
      const gemY = centerY + Math.sin(angle) * ringRadius;
      
      // Small gem
      ctx.beginPath();
      ctx.arc(gemX, gemY, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFF';
      ctx.fill();
      
      // Gem highlight
      ctx.beginPath();
      ctx.arc(gemX - 2, gemY - 2, 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#87CEEB';
      ctx.fill();
    }
    
    // Add text
    ctx.font = '16px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('Lord of the Rings Style Bracelet', centerX, canvas.height - 30);
    
    // Status text
    ctx.font = '12px Arial';
    ctx.fillStyle = '#AAA';
    ctx.fillText('Interactive 3D View - Use render mode buttons', centerX, canvas.height - 10);
  };
  
  // Initialize when 3D Studio becomes active
  const initRingWhenActive = () => {
    const screen3d = document.querySelector("[data-screen='screen-3d']");
    if (screen3d && screen3d.classList.contains('active')) {
      console.log('🚀 3D Studio is active - initializing ring...');
      setTimeout(createImmediateRing, 50);
    }
  };
  
  // Watch for tab changes
  document.addEventListener('click', (e) => {
    if (e.target.dataset.screenTarget === 'screen-3d') {
      console.log('🎯 3D Studio tab clicked!');
      setTimeout(initRingWhenActive, 100);
    }
  });
  
  // Also try immediately if already on 3D studio
  setTimeout(initRingWhenActive, 500);
  
  // Manual trigger for debugging
  window.showRing = () => {
    console.log('🔧 Manual ring trigger...');
    createImmediateRing();
  };
  
  // Full-screen toggle for 3D Studio
  const fullscreen3dBtn = document.getElementById("fullscreen-3d");
  if (fullscreen3dBtn) {
    fullscreen3dBtn.addEventListener("click", () => {
      const studio3d = document.querySelector("[data-screen='screen-3d']");
      if (studio3d) {
        studio3d.classList.toggle("fullscreen");
        fullscreen3dBtn.textContent = studio3d.classList.contains("fullscreen") ? "⛶" : "⛶";
      }
    });
  }

  // CAD toolbar tool selection
  document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentActive = document.querySelector(".tool-btn.active");
      if (currentActive) currentActive.classList.remove("active");
      btn.classList.add("active");
      console.log("CAD Tool Selected:", btn.dataset.tool);
    });
  });

  // View buttons (Front, Top, Side, Iso)
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentActive = document.querySelector(".view-btn.active");
      if (currentActive) currentActive.classList.remove("active");
      btn.classList.add("active");
      const view = btn.title;
      console.log("View Changed to:", view);
      
      // Update 3D camera position based on view
      if (camera && controls) {
        const distance = 25;
        switch(view) {
          case 'Front':
            camera.position.set(0, 0, distance);
            break;
          case 'Top':
            camera.position.set(0, distance, 0);
            break;
          case 'Side':
            camera.position.set(distance, 0, 0);
            break;
          case 'Iso':
            camera.position.set(distance * 0.7, distance * 0.7, distance * 0.7);
            break;
        }
        controls.update();
      }
    });
  });

  // Render mode buttons (Wireframe, Shaded, Material)
  document.querySelectorAll(".render-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentActive = document.querySelector(".render-btn.active");
      if (currentActive) currentActive.classList.remove("active");
      btn.classList.add("active");
      const mode = btn.dataset.render;
      console.log("Render Mode Changed to:", mode);
      
      // Update 3D rendering based on mode
      if (stlObject && stlObject.material) {
        switch(mode) {
          case 'wireframe':
            stlObject.material = new THREE.MeshBasicMaterial({ 
              color: 0xffd700, 
              wireframe: true 
            });
            break;
          case 'shaded':
            stlObject.material = new THREE.MeshLambertMaterial({ 
              color: 0xffd700 
            });
            break;
          case 'material':
            stlObject.material = new THREE.MeshPhongMaterial({ 
              color: 0xffd700, 
              shininess: 100,
              specular: 0x222222
            });
            break;
        }
      }
    });
  });

  // Panel tabs
  document.querySelectorAll(".panel-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const currentActive = document.querySelector(".panel-tab.active");
      if (currentActive) currentActive.classList.remove("active");
      tab.classList.add("active");
      
      const panelName = tab.dataset.panel;
      document.querySelectorAll(".panel-section").forEach(section => {
        section.classList.remove("active");
      });
      document.querySelector(`[data-panel="${panelName}"]`)?.classList.add("active");
    });
  });

  // Property inputs - update model on change
  document.querySelectorAll(".prop-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const propName = e.target.parentElement.querySelector(".prop-name")?.textContent;
      const newValue = e.target.value;
      console.log("Property Updated:", propName, "=>", newValue);
      // TODO: Update 3D model visualization
    });
  });

  // Model tree selection
  document.querySelectorAll(".tree-item").forEach(item => {
    item.addEventListener("click", () => {
      const currentSelected = document.querySelector(".tree-item.selected");
      if (currentSelected) currentSelected.classList.remove("selected");
      item.classList.add("selected");
      console.log("Model Component Selected:", item.querySelector(".tree-label")?.textContent);
    });
  });

  // Handle window resize for 3D viewport
  window.addEventListener('resize', () => {
    if (renderer && camera) {
      const canvas = document.getElementById("viewport-3d");
      if (canvas && canvas.parentElement) {
        const viewport = canvas.parentElement;
        const width = viewport.clientWidth;
        const height = viewport.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    }
  });

  // Viewport control buttons
  document.querySelectorAll(".control-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.title;
      if (title === "Zoom Fit" && camera && stlObject) {
        // Fit object in view
        const box = new THREE.Box3().setFromObject(stlObject);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxSize = Math.max(size.x, size.y, size.z);
        const distance = maxSize * 2;
        
        camera.position.set(
          center.x + distance * 0.7,
          center.y + distance * 0.7,
          center.z + distance * 0.7
        );
        
        if (controls) {
          controls.target.copy(center);
          controls.update();
        }
      } else if (title === "Home" && camera && controls) {
        // Reset to home position
        camera.position.set(0, 10, 20);
        controls.target.set(0, 0, 0);
        controls.update();
      }
    });
  });

  // Viewport canvas setup
  const viewport3d = document.getElementById("viewport-3d");
  if (viewport3d) {
    const ctx = viewport3d.getContext("2d");
    
    const resizeCanvas = () => {
      const container = viewport3d.parentElement;
      viewport3d.width = container.clientWidth;
      viewport3d.height = container.clientHeight;
      drawDefaultViewport();
    };
    
    const drawDefaultViewport = () => {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, viewport3d.width, viewport3d.height);
      
      // Draw grid
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let i = 0; i <= viewport3d.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, viewport3d.height);
        ctx.stroke();
      }
      for (let i = 0; i <= viewport3d.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(viewport3d.width, i);
        ctx.stroke();
      }
      
      // Draw center axes
      const cx = viewport3d.width / 2;
      const cy = viewport3d.height / 2;
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy);
      ctx.lineTo(cx + 50, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - 50);
      ctx.lineTo(cx, cy + 50);
      ctx.stroke();
      
      // Draw axis labels
      ctx.fillStyle = "#888";
      ctx.font = "11px 'Courier New'";
      ctx.fillText("X", cx + 55, cy - 5);
      ctx.fillText("Y", cx - 5, cy - 55);
      
      // Draw sample jewelry ring with stone and prongs
      ctx.lineWidth = 2;
      drawJewelryWireframe(ctx, cx, cy, 100);
    };
    
    const drawJewelryWireframe = (ctx, cx, cy, scale) => {
      // Main stone (oval/diamond shape)
      ctx.strokeStyle = "#4caf50";
      ctx.lineWidth = 2.5;
      
      // Stone outline - oval cut
      ctx.beginPath();
      ctx.ellipse(cx, cy - 30, scale * 0.35, scale * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Stone facets (top view)
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#81c784";
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i;
        const x1 = cx + Math.cos(angle) * scale * 0.25;
        const y1 = cy - 30 + Math.sin(angle) * scale * 0.35;
        const x2 = cx;
        const y2 = cy - 30;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      // Prongs (4-prong setting)
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = 2;
      const prongCount = 4;
      const prongAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      
      prongAngles.forEach((angle, idx) => {
        // Prong outline
        const prongDist = scale * 0.35;
        const topX = cx + Math.cos(angle) * prongDist;
        const topY = cy - 30 + Math.sin(angle) * prongDist;
        const bottomX = cx + Math.cos(angle) * prongDist * 0.7;
        const bottomY = cy + 15;
        
        // Prong edges
        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
        
        // Prong width
        const offset = 8;
        ctx.beginPath();
        ctx.moveTo(topX - offset * Math.sin(angle), topY + offset * Math.cos(angle));
        ctx.lineTo(bottomX - offset * Math.sin(angle), bottomY + offset * Math.cos(angle));
        ctx.stroke();
      });
      
      // Band (main ring)
      ctx.strokeStyle = "#ff9800";
      ctx.lineWidth = 2.5;
      
      // Band front edge (main ellipse)
      ctx.beginPath();
      ctx.ellipse(cx, cy + 20, scale * 0.7, scale * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Band side profile
      ctx.strokeStyle = "#ffb74d";
      ctx.lineWidth = 2;
      
      // Left side of band
      ctx.beginPath();
      ctx.moveTo(cx - scale * 0.7, cy + 20);
      ctx.quadraticCurveTo(cx - scale * 0.75, cy + 5, cx - scale * 0.6, cy - 40);
      ctx.stroke();
      
      // Right side of band
      ctx.beginPath();
      ctx.moveTo(cx + scale * 0.7, cy + 20);
      ctx.quadraticCurveTo(cx + scale * 0.75, cy + 5, cx + scale * 0.6, cy - 40);
      ctx.stroke();
      
      // Halo (accent stones around main stone)
      ctx.strokeStyle = "#c0c0c0";
      ctx.lineWidth = 1.5;
      const haloRadius = scale * 0.55;
      const haloStones = 8;
      
      for (let i = 0; i < haloStones; i++) {
        const angle = (Math.PI * 2 / haloStones) * i;
        const x = cx + Math.cos(angle) * haloRadius;
        const y = cy - 30 + Math.sin(angle) * haloRadius;
        
        // Small stone circles
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Band texture lines (shine/polish indication)
      ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const offset = -30 + i * 15;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 20 + offset * 0.3, scale * 0.65, scale * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Measurement indicators
      ctx.strokeStyle = "#1f8a70";
      ctx.lineWidth = 1;
      
      // Band width indicator
      ctx.beginPath();
      ctx.moveTo(cx - scale * 0.7 - 20, cy + 20);
      ctx.lineTo(cx - scale * 0.7 - 25, cy + 20);
      ctx.moveTo(cx - scale * 0.7 - 22, cy + 15);
      ctx.lineTo(cx - scale * 0.7 - 22, cy + 25);
      ctx.stroke();
      
      // Stone size indicator
      ctx.beginPath();
      ctx.moveTo(cx - scale * 0.35 - 15, cy - 30);
      ctx.lineTo(cx + scale * 0.35 + 15, cy - 30);
      ctx.moveTo(cx - scale * 0.35, cy - 40);
      ctx.lineTo(cx - scale * 0.35, cy - 20);
      ctx.moveTo(cx + scale * 0.35, cy - 40);
      ctx.lineTo(cx + scale * 0.35, cy - 20);
      ctx.stroke();
      
      // Dimension text
      ctx.fillStyle = "#1f8a70";
      ctx.font = "10px 'Courier New'";
      ctx.fillText("9.2mm", cx + scale * 0.4, cy - 50);
      ctx.fillText("2.0mm", cx - scale * 0.7 - 35, cy + 30);
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Mouse controls for viewport
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let rotationX = 0, rotationY = 0;
    
    viewport3d.addEventListener("mousedown", (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });
    
    viewport3d.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        rotationY += deltaX * 0.5;
        rotationX += deltaY * 0.5;
        console.log("Viewport Rotation:", {rotationX, rotationY});
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });
    
    viewport3d.addEventListener("mouseup", () => {
      isDragging = false;
    });
    
    viewport3d.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      console.log("Viewport Zoom:", zoomDelta);
    });
  }

  // Approve for Production button
  const approveProdBtn = document.querySelector("[data-tool='approve']");
  if (approveProdBtn) {
    approveProdBtn.addEventListener("click", () => {
      const designId = document.querySelector(".detail-value")?.textContent || "RM-1042-v3";
      console.log("Design approved for production:", designId);
      alert(`✓ Design ${designId} approved for production!\nTransferring to manufacturing queue...`);
      // TODO: Send to manufacturing queue
    });
  }

  // ===== DASHBOARD METRICS & ANALYTICS =====
  
  const dashboardMetrics = {
    designs: 24,
    inProgress: 7,
    completed: 12,
    approvalRate: 89,
    productionQueue: 5,
    avgTurnaroundTime: 3.2
  };

  const updateDashboardMetrics = () => {
    // Update any dashboard metric elements
    const metricsElements = document.querySelectorAll("[data-metric]");
    metricsElements.forEach(el => {
      const metric = el.dataset.metric;
      const value = dashboardMetrics[metric];
      if (value !== undefined) {
        const valueEl = el.querySelector(".metric-value");
        if (valueEl) {
          // Animate number change
          const current = parseInt(valueEl.textContent) || 0;
          if (current !== value) {
            animateValue(valueEl, current, value, 600);
          }
        }
      }
    });
  };

  const animateValue = (el, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      el.textContent = Math.round(current);
    }, 16);
  };

  // Initialize dashboard with metrics
  if (document.querySelector("[data-metric]")) {
    updateDashboardMetrics();
  }

  renderChat();
  renderReferences();
  updateApprovalUI();
  renderQueue();
  updateVaultState();
  handleSearchInput();
  if (sketchToolButtons.length) setSketchTool(sketchState.tool);
  if (sketchColorButtons.length) setSketchColor(sketchState.color);
  if (sketchSizeInput) sketchState.size = Number(sketchSizeInput.value) || sketchState.size;

  const initial = document.querySelector(".screen.active")?.dataset.screen || "screen-1";
  setActiveScreen(initial);
  ensureVisibleScreen();
  updateStudioPanels();
  
  // 3D Viewer Debugging and Manual Controls
  console.log('Setting up 3D viewer debugging...');
  
  // Check Three.js availability
  if (typeof THREE !== 'undefined') {
    console.log('✅ Three.js loaded successfully');
    console.log('Available constructors:', Object.keys(THREE).slice(0, 10));
  } else {
    console.error('❌ Three.js not loaded!');
  }
  
  // Add manual initialization function for debugging
  window.init3DViewerManual = () => {
    console.log('🔧 Manual 3D initialization triggered');
    const canvas = document.getElementById("viewport-3d");
    console.log('Canvas found:', !!canvas);
    
    if (!renderer && canvas) {
      init3DViewer();
    } else if (renderer) {
      console.log('3D viewer already initialized');
    } else {
      console.log('Canvas not found - make sure you are on 3D Studio tab');
    }
  };
  
  // Add console helper
  window.check3DStatus = () => {
    console.log('=== 3D Viewer Status ===');
    console.log('Scene:', !!scene);
    console.log('Camera:', !!camera);  
    console.log('Renderer:', !!renderer);
    console.log('STL Object:', !!stlObject);
    console.log('Canvas:', !!document.getElementById("viewport-3d"));
    console.log('3D Screen Active:', document.querySelector("[data-screen='screen-3d']")?.classList.contains('active'));
  };
  
  console.log('💡 Debug commands available:');
  console.log('- showRing() : Force show ring immediately');
  console.log('- check3DStatus() : Check 3D viewer status');
  
  // Force show ring after a short delay
  setTimeout(() => {
    console.log('🔄 Auto-initializing ring...');
    const canvas = document.getElementById('viewport-3d');
    if (canvas) {
      console.log('✅ Canvas found, creating ring...');
      createImmediateRing();
    } else {
      console.log('❌ Canvas not found yet');
    }
  }, 2000);
})();
