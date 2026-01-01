# 3D Studio Demo Guide

## Quick Start Demo (2-3 minutes)

### Step 1: Login to System
1. Open `login.html`
2. Select **"I'm a Jeweler"** role
3. Click **"Demo Workspace"**
4. Click **"Enter System"**

### Step 2: Navigate to Design Studio
1. In the left sidebar menu, click **"Design"**
2. Select **"Design Studio"** (screen-4)
3. You'll see a ChatGPT-style interface with:
   - Chat conversation history (Minimal, oval, hidden halo)
   - Reference images on the right sidebar
   - Design brief with project details
   - Message composer at the bottom

### Step 3: View Design Studio Features
1. **Design Brief**: Shows "RM-1042 - Oval Solitaire" with brief and mood
2. **References**: Shows mood board images on the right
3. **Chat History**: Shows previous conversation about design preferences
4. **Message Input**: Type messages or use buttons

### Step 4: Generate and Refine 2D Design
1. In the message input box, type: `"Final design looks good, let's make band 1.5mm"`
2. Click the **Send** button or press Enter
3. AI responds with refinement options
4. Click **"Sketch Tweaks"** button on any image to:
   - Draw modifications on the canvas
   - Use different brush colors
   - Adjust brush size
   - Click **Send Sketch** to add to conversation

### Step 5: Approve for 3D
1. When satisfied with the 2D design, click **"Approve This"** button on an image
2. This unlocks the **"Approve for 3D"** button at the bottom
3. Make sure **"Mark ready"** toggle is activated
4. Click **"Approve for 3D"** button
5. System shows: `"Design approved! Navigating to 3D Studio..."`
6. Auto-navigates to **3D Studio** (screen-3d)

---

## 3D Studio Feature Demo

### Step 1: Explore the Interface
**Top Toolbar**:
- Selection Tools: Select, Orbit, Pan, Zoom
- Measurement Tools: Measure, Dimension, Section
- Editing Tools: Fillet, Chamfer, Extrude
- Action Tools: Screenshot, Export, Approve for Production

**Left Sidebar**:
- **Model Tree**: Shows design components (Band, Setting, Stone, Halo Accents)
- **View Options**: Front, Top, Side, Iso perspectives
- **Render Modes**: Wireframe, Shaded, Material

**Center Viewport**:
- Shows 3D ring wireframe visualization
- Grid background for scale reference
- Center axes for orientation
- Control buttons in top-right corner
- Zoom, pan, and orbit controls

**Right Sidebar**:
- **Properties Panel**: Editable dimensions
- **Statistics**: Weight (5.2g), Cost ($820), Fit Check (✓ Pass)

**Bottom Panel**:
- **Details Tab**: Design ID, modification time, status
- **Manufacturing Tab**: Casting method, finish, setting notes
- **Quality Checks Tab**: Pass/fail checks with suggestions
- **History Tab**: Change log of modifications

### Step 2: Test the Viewport
1. Click and drag on the viewport canvas to **pan** the model
2. Scroll wheel to **zoom** in/out
3. Click **"⊡"** button to **Fit to view**
4. Click **"⌂"** button to **Home view**

### Step 3: Change Visualization
1. Click **"Shaded"** button to see solid rendering (from Wireframe)
2. Click **"Material"** button to see textured view
3. Click **"Wireframe"** to return to technical view

### Step 4: View Different Perspectives
1. Click **"Front"** button to see front view
2. Click **"Top"** button to see top-down view
3. Click **"Side"** button to see profile view
4. Click **"Iso"** button to return to 3D isometric view

### Step 5: Edit Design Properties
1. In the right sidebar, find **Band** section
2. Click on the "Width" input field (shows "2.0mm")
3. Change to `"1.5mm"` (matches your design studio tweak)
4. Press Enter - property updates
5. Notice the history tab now logs: `"Band width adjusted 2.5mm → 2.0mm"`

**More Property Examples to Try**:
- Band Height: 2.2mm → 2.0mm
- Stone Width: 9.2mm → 8.5mm
- Prong Count: Select "6 Prongs" (upgrade)
- Halo Width: 1.2mm → 1.5mm
- Material: Change to "Platinum"

### Step 6: Review Quality Checks
1. Click **"Quality Checks"** tab in bottom panel
2. See passing checks:
   - ✓ Manufacturability
   - ✓ Fit analysis
   - ✓ Material spec
3. See warning: `"! Prong height could be reduced by 0.2mm"`
4. Optionally apply the suggestion by editing "Prong Height" to 3.0mm

### Step 7: Review Manufacturing Notes
1. Click **"Manufacturing"** tab
2. See specifications:
   - Casting method: Investment casting
   - Finish: High polish
   - Setting notes: Tight fit required
   - QA: Prong torque check mandatory

### Step 8: View Design History
1. Click **"History"** tab
2. See all changes made:
   - Created from image - 2 hours ago
   - Band width adjusted 2.5mm → 2.0mm - 1 hour ago
   - Prongs increased 4 → 6 - 45 mins ago
   - Material changed to White Gold - 12 mins ago

### Step 9: Full-Screen Mode
1. Click **"⛶"** button in top-right corner
2. Interface expands to full screen (hides browser chrome)
3. Perfect for detailed dimension work
4. Click again to exit full-screen

### Step 10: Approve for Production
1. Click **"Approve for Production"** button in top toolbar
2. System shows: `"✓ Design RM-1042-v3 approved for production!"`
3. Message: `"Transferring to manufacturing queue..."`
4. Design is now queued for manufacturing workflow

---

## Navigation & Quick Tips

### Getting Back to Design Studio
1. Click **"Design"** in left sidebar
2. Select **"Design Studio"** (screen-4)
3. Chat history is preserved

### Keyboard Shortcuts (Future Implementation)
- **V**: Select tool
- **O**: Orbit tool
- **P**: Pan tool
- **M**: Measure tool
- **F**: Fit to view
- **H**: Home view
- **Esc**: Exit full-screen (planned)

### Pro Tips
1. **Property Editing**: Use Tab to move between input fields for faster editing
2. **Multiple Views**: Keep different perspectives open in tabs for reference
3. **Quality Checks**: Always review QA warnings before final approval
4. **Manufacturing Notes**: Communicate special requirements to production team
5. **Export**: Use Screenshot button for design presentations or approvals

---

## Role-Based Access

### Jeweler (Production Manager)
- ✓ Full access to 3D Studio
- ✓ Can edit all properties
- ✓ Can approve for production
- ✓ Can view manufacturing notes
- ✓ Can run quality checks
- ✓ Access to production queue

### Customer (Design Approval)
- ✓ View 3D design (read-only)
- ✗ Cannot edit properties
- ✗ Cannot approve for production
- ✓ Can provide feedback via chat

---

## Common Workflows

### Workflow 1: Simple Dimension Tweak
1. User in Design Studio mentions: "Band should be thinner"
2. Jeweler navigates to 3D Studio
3. Changes Band Thickness from 1.8mm to 1.6mm
4. History logs the change
5. Quality checks re-run and pass
6. Approves for production

### Workflow 2: Prong Count Upgrade
1. Customer requests: "Add more prongs for security"
2. Design Studio: User updates prong count in chat
3. Jeweler navigates to 3D Studio
4. Changes Prong Count from 4 to 6
5. System recalculates weight (higher) and cost
6. Quality checks verify proper spacing
7. Approves for production

### Workflow 3: Material Substitution
1. Gold prices increase
2. Customer wants to evaluate alternatives
3. Jeweler changes Material from 18K White Gold to Platinum
4. Weight and cost estimates update
5. Manufacturing notes updated for new metal requirements
6. Customer approves alternate material
7. Approves for production

### Workflow 4: Full Design Review
1. Complete design visible in 3D Studio
2. Jeweler rotates through all four views (Front, Top, Side, Iso)
3. Takes screenshots of each view for client
4. Reviews all quality checks
5. References manufacturing notes
6. Reviews entire change history
7. Confident in design integrity
8. Approves for production

---

## Testing Checklist

Use this checklist to verify all 3D Studio features:

### Interface
- [ ] Top toolbar visible and buttons are clickable
- [ ] Left sidebar displays Model Tree, Views, Render Modes
- [ ] Right sidebar shows Properties Panel and Statistics
- [ ] Center viewport shows ring wireframe
- [ ] Bottom panel with tabs (Details, Manufacturing, Quality Checks, History)

### Viewport Interaction
- [ ] Canvas displays correctly
- [ ] Grid and center axes visible
- [ ] Zoom controls appear in top-right
- [ ] Mouse interactions (drag, scroll) responsive

### Property Editing
- [ ] Can click on property input fields
- [ ] Can type new values
- [ ] Values update on Enter or blur
- [ ] Validation prevents invalid inputs

### View Options
- [ ] Each view button (Front, Top, Side, Iso) highlights when clicked
- [ ] Only one view active at a time
- [ ] Multiple renders possible without conflicts

### Render Modes
- [ ] Wireframe (default) shows green lines
- [ ] Shaded option highlights when clicked
- [ ] Material option highlights when clicked
- [ ] Only one render mode active at a time

### Tab Navigation
- [ ] Details tab shows design information
- [ ] Manufacturing tab shows production notes
- [ ] Quality Checks tab shows pass/fail items
- [ ] History tab shows change log
- [ ] Only one tab content visible at a time
- [ ] Tab highlighting works correctly

### Statistics
- [ ] Weight displays: 5.2g
- [ ] Cost displays: $820
- [ ] Fit Check shows green "✓ Pass" badge
- [ ] Stats update when properties change (future)

### Full-Screen
- [ ] Full-screen button (⛶) is clickable
- [ ] Clicking toggles full-screen state
- [ ] Viewport expands to full screen
- [ ] Clicking again exits full-screen

### Data Persistence
- [ ] Refreshing page preserves approval state
- [ ] Design ID persists: RM-1042-v3
- [ ] Properties remain if page is reloaded
- [ ] History is preserved

### Responsive Design
- [ ] Large screen (>1400px): 3-column layout
- [ ] Medium screen (1000-1400px): viewport + right sidebar
- [ ] Small screen (<1000px): viewport only

### Integration
- [ ] "Approve for 3D" button from Design Studio works
- [ ] Auto-navigation from Design Studio to 3D Studio
- [ ] Design data transfers correctly
- [ ] Approval state saves to localStorage

---

## Troubleshooting Demo

### Issue: Viewport shows blank/no wireframe
**Solution**: 
1. Check browser console (F12) for JavaScript errors
2. Ensure Canvas API is supported
3. Try refreshing the page
4. Check if JavaScript is enabled

### Issue: Properties don't seem to update model
**Note**: Real 3D model rendering is TODO. Properties are captured and logged but visual updates not yet implemented in Phase 1.

### Issue: Can't see Full-Screen icon
**Solution**:
1. Check top-right corner of 3D Studio screen header
2. Icon is "⛶" (fullscreen symbol)
3. May be small - hover over buttons to see tooltips

### Issue: Bottom panel tabs not switching
**Solution**:
1. Click directly on tab text (not background)
2. Check browser console for click event errors
3. Try clicking a different tab first

### Issue: Sidebar properties not visible
**Solution**:
1. On small screens (<1000px), sidebars are hidden
2. Resize browser window larger
3. Or check responsive breakpoints in CSS

---

## Next Steps (Phase 2+)

After this 3D Studio foundation, future phases will add:

1. **Real 3D Rendering** (Three.js integration)
   - Actual 3D model display instead of wireframe
   - Proper lighting and shadows
   - Material/texture mapping

2. **Advanced Editing**
   - Orbit controls (rotate model smoothly)
   - Pan with measurement overlays
   - Sketch planes for detailed editing
   - Boolean operations

3. **Manufacturing Integration**
   - Tool path generation
   - Production time estimation
   - Automatic cost calculation
   - Quality certification documents

4. **Export & CAD Formats**
   - STEP, IGES, STL export
   - PDF technical drawings
   - Manufacturing specifications
   - 3D printable format

5. **Collaboration Features**
   - Real-time multi-user editing
   - Comments and markup system
   - Version control
   - Team approval workflows

---

## Support & Feedback

**For Questions**: Refer to [3D_STUDIO_README.md](3D_STUDIO_README.md) for detailed documentation

**For Issues**: Check browser console (F12) → Console tab for error messages

**For Suggestions**: Document feature requests with expected behavior and use case
