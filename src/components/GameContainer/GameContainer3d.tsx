import React, { Component } from "react";
import * as THREE from "three";

export default class GameContainer3d extends Component {
  private scene = THREE.Scene();
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _axis: THREE.AxisHelper;
  private _light: THREE.DirectionalLight;
  private _light2: THREE.DirectionalLight;
  private _material: THREE.MeshBasicMaterial;
  private _box: THREE.Mesh;

  public constructor() {
    this._scene = new THREE.Scene(); // create the scene
    // create the camera
    this._camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this._renderer = new THREE.WebGLRenderer();
    this._axis = new THREE.AxisHelper(10); // add axis to the scene
    this._light = new THREE.DirectionalLight(0xffffff, 1.0); // add light1
    this._light2 = new THREE.DirectionalLight(0xffffff, 1.0); // add light2
    this._material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true
    });
    // create a box and add it to the scene
    this._box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this._material);
  }
}
