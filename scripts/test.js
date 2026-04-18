/**
 * test.js - QA Gatekeeper for Firmware Validation
 * 
 * This script acts as the quality assurance checkpoint in the CI/CD pipeline.
 * It executes the firmware simulation and validates that the boot sequence
 * completes successfully.
 * 
 * Success Criteria:
 * - Firmware must output 'System OK' indicating successful boot
 * - Process must complete without errors
 * 
 * Exit Codes:
 * - 0: Test passed (allows pipeline to proceed to release)
 * - 1: Test failed (blocks pipeline, prevents bad release)
 */

const { exec } = require('child_process');

console.log('🔍 QA Gatekeeper: Starting Firmware Validation...');
console.log('═══════════════════════════════════════════════════');
console.log('');

// Execute the firmware simulation
// Use __dirname to ensure we run from the correct directory
const path = require('path');
const firmwarePath = path.join(__dirname, '..', 'src', 'firmware.js');
exec(`node "${firmwarePath}"`, (error, stdout, stderr) => {
  
  // Display firmware output for transparency
  console.log('Firmware Output:');
  console.log('─────────────────────────────────────────────────');
  console.log(stdout);
  
  if (stderr) {
    console.error('⚠️  Standard Error Output:');
    console.error(stderr);
  }
  
  console.log('─────────────────────────────────────────────────');
  console.log('');
  
  // Check for execution errors
  if (error) {
    console.error('❌ QA FAILED: Firmware execution error');
    console.error(`Error Details: ${error.message}`);
    console.log('');
    console.log('🚫 PIPELINE BLOCKED: Release cannot proceed');
    process.exit(1);
  }
  
  // Validate that the boot sequence completed successfully
  if (stdout.includes('System OK')) {
    console.log('✅ QA PASSED: Firmware boot sequence validated');
    console.log('✅ All quality gates satisfied');
    console.log('');
    console.log('🎯 PIPELINE APPROVED: Proceeding to build and release');
    process.exit(0);
  } else {
    console.error('❌ QA FAILED: Expected "System OK" not found in output');
    console.log('');
    console.log('🚫 PIPELINE BLOCKED: Release cannot proceed');
    process.exit(1);
  }
});
