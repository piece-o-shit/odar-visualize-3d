
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { toast } from 'sonner';

interface OdARModelViewerProps {
  className?: string;
}

export const OdARModelViewer = ({ className = '' }: OdARModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7fafc);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // Helper functions for creating the OdAR model
    const createMainEnclosure = () => {
      const group = new THREE.Group();
      
      // Front panel
      const frontGeometry = new THREE.BoxGeometry(1, 0.6, 0.05);
      const frontMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xbfddf5,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      });
      const frontPanel = new THREE.Mesh(frontGeometry, frontMaterial);
      frontPanel.position.z = 0.15;
      group.add(frontPanel);
      
      // Top panel
      const topGeometry = new THREE.BoxGeometry(1, 0.05, 0.3);
      const topMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd5e6f3,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      });
      const topPanel = new THREE.Mesh(topGeometry, topMaterial);
      topPanel.position.y = 0.3;
      group.add(topPanel);
      
      // Side panel
      const sideGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.3);
      const sideMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9abcdd,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      });
      const sidePanel = new THREE.Mesh(sideGeometry, sideMaterial);
      sidePanel.position.x = 0.5;
      group.add(sidePanel);
      
      // Back panel
      const backGeometry = new THREE.BoxGeometry(1, 0.6, 0.05);
      const backMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x89b4d9,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      });
      const backPanel = new THREE.Mesh(backGeometry, backMaterial);
      backPanel.position.z = -0.15;
      group.add(backPanel);
      
      // Bottom panel
      const bottomGeometry = new THREE.BoxGeometry(1, 0.05, 0.3);
      const bottomMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd5e6f3,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      });
      const bottomPanel = new THREE.Mesh(bottomGeometry, bottomMaterial);
      bottomPanel.position.y = -0.3;
      group.add(bottomPanel);
      
      // Left side panel
      const leftSideGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.3);
      const leftSideMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9abcdd,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      });
      const leftSidePanel = new THREE.Mesh(leftSideGeometry, leftSideMaterial);
      leftSidePanel.position.x = -0.5;
      group.add(leftSidePanel);

      return group;
    };

    const createDisplay = () => {
      const group = new THREE.Group();
      
      // Display frame
      const frameGeometry = new THREE.BoxGeometry(0.35, 0.175, 0.01);
      const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.5,
        roughness: 0.2,
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.z = 0.18;
      group.add(frame);
      
      // Display screen
      const screenGeometry = new THREE.BoxGeometry(0.3, 0.125, 0.005);
      const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x111111,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.z = 0.19;
      group.add(screen);
      
      return group;
    };

    const createSensors = () => {
      const group = new THREE.Group();
      
      // Front ultrasonic sensor
      const frontSensorGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.01, 32);
      const sensorMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xe1e1e1,
        metalness: 0.2,
        roughness: 0.3,
      });
      const frontSensor = new THREE.Mesh(frontSensorGeometry, sensorMaterial);
      frontSensor.rotation.x = Math.PI / 2;
      frontSensor.position.set(-0.25, 0.1, 0.18);
      group.add(frontSensor);
      
      // Side ultrasonic sensor
      const sideSensorGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 32);
      const sideSensor = new THREE.Mesh(sideSensorGeometry, sensorMaterial);
      sideSensor.rotation.z = Math.PI / 2;
      sideSensor.position.set(0.51, 0, 0);
      group.add(sideSensor);
      
      // Top ultrasonic sensor
      const topSensorGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 32);
      const topSensor = new THREE.Mesh(topSensorGeometry, sensorMaterial);
      topSensor.position.set(0.2, 0.33, 0);
      group.add(topSensor);
      
      return group;
    };

    const createButtons = () => {
      const group = new THREE.Group();
      
      // Button materials
      const buttonMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x444444,
        metalness: 0.3,
        roughness: 0.4,
      });
      
      // Create three buttons
      for (let i = 0; i < 3; i++) {
        const buttonGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 32);
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.rotation.x = Math.PI / 2;
        button.position.set(-0.15 + i * 0.15, -0.15, 0.18);
        group.add(button);
      }
      
      return group;
    };

    const createGrille = () => {
      const group = new THREE.Group();
      
      // Grille background
      const backGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.01);
      const backMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.4,
        roughness: 0.2,
      });
      const back = new THREE.Mesh(backGeometry, backMaterial);
      back.position.set(0.35, 0.1, 0.18);
      group.add(back);
      
      // Grille lines
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
      
      // Vertical lines
      for (let i = 0; i < 6; i++) {
        const lineGeometry = new THREE.BoxGeometry(0.005, 0.1, 0.005);
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0.31 + i * 0.016, 0.1, 0.185);
        group.add(line);
      }
      
      // Horizontal lines
      for (let i = 0; i < 6; i++) {
        const lineGeometry = new THREE.BoxGeometry(0.1, 0.005, 0.005);
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0.35, 0.06 + i * 0.016, 0.185);
        group.add(line);
      }
      
      return group;
    };

    const createLED = () => {
      const geometry = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x22ff22,
        emissive: 0x22ff22,
        emissiveIntensity: 0.5,
      });
      const led = new THREE.Mesh(geometry, material);
      led.rotation.x = Math.PI / 2;
      led.position.set(-0.3, -0.15, 0.18);
      
      return led;
    };

    const createPorts = () => {
      const group = new THREE.Group();
      
      // USB-C port
      const usbGeometry = new THREE.BoxGeometry(0.075, 0.04, 0.01);
      const usbMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.7,
        roughness: 0.2,
      });
      const usb = new THREE.Mesh(usbGeometry, usbMaterial);
      usb.position.set(0.35, -0.15, 0.18);
      group.add(usb);
      
      // Power switch
      const switchGeometry = new THREE.BoxGeometry(0.05, 0.025, 0.01);
      const switchMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.3,
      });
      const powerSwitch = new THREE.Mesh(switchGeometry, switchMaterial);
      powerSwitch.position.set(0.45, -0.15, 0.18);
      group.add(powerSwitch);
      
      return group;
    };

    // Create and position all model elements
    const mainEnclosure = createMainEnclosure();
    scene.add(mainEnclosure);
    
    const display = createDisplay();
    display.position.y = 0.1;
    scene.add(display);
    
    const sensors = createSensors();
    scene.add(sensors);
    
    const buttons = createButtons();
    scene.add(buttons);
    
    const grille = createGrille();
    scene.add(grille);
    
    const led = createLED();
    scene.add(led);
    
    const ports = createPorts();
    scene.add(ports);

    // Add text labels
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 128;
      
      if (context) {
        context.fillStyle = 'rgba(255, 255, 255, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.font = 'Bold 24px Arial';
        context.fillStyle = '#4FC3F7';
        context.textAlign = 'center';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.5, 0.25, 1);
      
      return sprite;
    };

    const displayLabel = createTextSprite('OdAR');
    displayLabel.position.set(0, 0.1, 0.2);
    scene.add(displayLabel);

    // Add rotation controls
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };
    let rotationSpeed = 0.003;
    let autoRotate = true;

    // Auto-rotation
    const autoRotateModel = () => {
      if (autoRotate) {
        mainEnclosure.rotation.y += rotationSpeed;
        display.rotation.y += rotationSpeed;
        sensors.rotation.y += rotationSpeed;
        buttons.rotation.y += rotationSpeed;
        grille.rotation.y += rotationSpeed;
        led.rotation.y += rotationSpeed;
        ports.rotation.y += rotationSpeed;
        displayLabel.rotation.y += rotationSpeed;
      }
    };

    // Mouse controls
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      autoRotate = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };

        const rotationY = deltaMove.x * 0.01;
        const rotationX = deltaMove.y * 0.01;

        mainEnclosure.rotation.y += rotationY;
        mainEnclosure.rotation.x += rotationX;
        display.rotation.y += rotationY;
        display.rotation.x += rotationX;
        sensors.rotation.y += rotationY;
        sensors.rotation.x += rotationX;
        buttons.rotation.y += rotationY;
        buttons.rotation.x += rotationX;
        grille.rotation.y += rotationY;
        grille.rotation.x += rotationX;
        led.rotation.y += rotationY;
        led.rotation.x += rotationX;
        ports.rotation.y += rotationY;
        ports.rotation.x += rotationX;
        displayLabel.rotation.y += rotationY;
        displayLabel.rotation.x += rotationX;

        previousMousePosition = {
          x: e.clientX,
          y: e.clientY
        };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Zoom controls
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Adjust camera position based on wheel delta
      const zoomSpeed = 0.1;
      camera.position.z += (e.deltaY > 0) ? zoomSpeed : -zoomSpeed;
      
      // Limit zoom range
      camera.position.z = Math.max(2, Math.min(10, camera.position.z));
    };

    // Touch controls
    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      autoRotate = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        
        const rotationY = deltaX * 0.01;
        const rotationX = deltaY * 0.01;
        
        mainEnclosure.rotation.y += rotationY;
        mainEnclosure.rotation.x += rotationX;
        display.rotation.y += rotationY;
        display.rotation.x += rotationX;
        sensors.rotation.y += rotationY;
        sensors.rotation.x += rotationX;
        buttons.rotation.y += rotationY;
        buttons.rotation.x += rotationX;
        grille.rotation.y += rotationY;
        grille.rotation.x += rotationX;
        led.rotation.y += rotationY;
        led.rotation.x += rotationX;
        ports.rotation.y += rotationY;
        ports.rotation.x += rotationX;
        displayLabel.rotation.y += rotationY;
        displayLabel.rotation.x += rotationX;
        
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    // Add event listeners
    containerRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerRef.current.addEventListener('wheel', onWheel);
    containerRef.current.addEventListener('touchstart', onTouchStart);
    containerRef.current.addEventListener('touchmove', onTouchMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Auto-rotate when not interacting
      autoRotateModel();
      
      // Pulse LED effect
      const time = Date.now() * 0.001;
      const ledMaterial = led.material as THREE.MeshBasicMaterial;
      ledMaterial.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.3;
      
      renderer.render(scene, camera);
    };

    // Show loading state and start animation
    setTimeout(() => {
      setIsLoading(false);
      toast.success("3D Model loaded successfully!", {
        description: "Click and drag to rotate. Use scroll wheel to zoom.",
        duration: 5000,
      });
    }, 1500);
    
    animate();

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      containerRef.current?.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      containerRef.current?.removeEventListener('wheel', onWheel);
      containerRef.current?.removeEventListener('touchstart', onTouchStart);
      containerRef.current?.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 animate-fade-in">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-rotate-slow"></div>
          <p className="mt-4 text-muted-foreground">Loading 3D Model...</p>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-lg overflow-hidden shadow-lg transition-opacity duration-700"
        style={{ opacity: isLoading ? 0 : 1 }}
      ></div>
    </div>
  );
};
