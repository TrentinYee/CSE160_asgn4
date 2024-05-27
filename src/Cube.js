class Cube{
    constructor(){
      this.type='cube';
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.textureNum=0;
    }
  
    render() {
      var rgba = this.color;

      // pass the texture number
      gl.uniform1i(u_whichTexture, this.textureNum);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // pass the point color
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      drawTriangle3DUVNormal(
        [0,0,0, 1,1,0, 1,0,0],
        [0,0, 1,1, 1,0],
        [0, 0, -1, 0, 0, -1, 0, 0, -1,]
      )
      
      drawTriangle3DUVNormal( [0,0,0, 0,1,0, 1,1,0,], [0,0, 0,1, 1,1], [0, 0, -1, 0, 0, -1, 0, 0, -1,]);

      // back side
      drawTriangle3DUVNormal( [0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0,], [0,0, 1,1, 1,0], [0, 0, 1, 0, 0, 1, 0, 0, 1,]);
      drawTriangle3DUVNormal( [0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0,], [0,0, 0,1, 1,1], [0, 0, 1, 0, 0, 1, 0, 0, 1,]);
      
      // top side
      drawTriangle3DUVNormal( [0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0,], [0,0, 1,0, 1,1], [0, 1, 0, 0, 1, 0, 0, 1, 0,]);
      drawTriangle3DUVNormal( [0.0,1.0,0.0, 1.0,1.0,1.0, 0.0,1.0,1.0,], [0,0, 1,1, 0,1], [0, 1, 0, 0, 1, 0, 0, 1, 0,]);

      // bottom side
      drawTriangle3DUVNormal( [0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,1.0,], [0,0, 1,0, 1,1], [0, -1, 0, 0, -1, 0, 0, -1, 0,]);
      drawTriangle3DUVNormal( [0.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0,], [0,0, 1,1, 0,1], [0, -1, 0, 0, -1, 0, 0, -1, 0,]);

      // left side
      drawTriangle3DUVNormal( [0.0,0.0,0.0, 0.0,1.0,1.0, 0.0,0.0,1.0,], [0,0, 1,1, 1,0], [-1, 0, 0, -1, 0, 0, -1, 0, 0,]);
      drawTriangle3DUVNormal( [0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0,], [0,0, 0,1, 1,1], [-1, 0, 0, -1, 0, 0, -1, 0, 0,]);

      // right side
      drawTriangle3DUVNormal( [1.0,0.0,0.0, 1.0,1.0,1.0, 1.0,0.0,1.0,], [0,0, 1,1, 1,0], [1, 0, 0, 1, 0, 0, 1, 0, 0,]);
      drawTriangle3DUVNormal( [1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0,], [0,0, 0,1, 1,1], [1, 0, 0, 1, 0, 0, 1, 0, 0,]);

    }

    renderfast() {
      var rgba = this.color;
      var allverts = [];
      var alluvs = [];
      var allnorms = [];

      //Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

      gl.uniform1i(u_whichTexture, this.textureNum);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // just the front of the cube
      allverts = allverts.concat( [0,0,0, 1,1,0, 1,0,0]);
      alluvs = alluvs.concat( [0,0, 1,1, 1,0]);
      allverts = allverts.concat( [0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0,]);
      alluvs = alluvs.concat( [0,0, 0,1, 1,1]);
      allnorms = allnorms.concat ([0, 0, -1, 0, 0, -1, 0, 0, -1,]);
      allnorms = allnorms.concat ([0, 0, -1, 0, 0, -1, 0, 0, -1,]);

      // back side
      allverts = allverts.concat( [0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,1, 1,0]);
      allverts = allverts.concat( [0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 0,1, 1,1]);
      allnorms = allnorms.concat ([0, 0, 1, 0, 0, 1, 0, 0, 1,]);
      allnorms = allnorms.concat ([0, 0, 1, 0, 0, 1, 0, 0, 1,]);
      
      // top side
      allverts = allverts.concat( [0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,0, 1,1]);
      allverts = allverts.concat( [0.0,1.0,0.0, 1.0,1.0,1.0, 0.0,1.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,1, 0,1]);
      allnorms = allnorms.concat ([0, 1, 0, 0, 1, 0, 0, 1, 0,]);
      allnorms = allnorms.concat ([0, 1, 0, 0, 1, 0, 0, 1, 0,]);

      // bottom side
      allverts = allverts.concat( [0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,0, 1,1]);
      allverts = allverts.concat( [0.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,1, 0,1]);
      allnorms = allnorms.concat ([0, -1, 0, 0, -1, 0, 0, -1, 0,]);
      allnorms = allnorms.concat ([0, -1, 0, 0, -1, 0, 0, -1, 0,]);

      // left side
      allverts = allverts.concat( [0.0,0.0,0.0, 0.0,1.0,1.0, 0.0,0.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,1, 1,0]);
      allverts = allverts.concat( [0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 0,1, 1,1]);
      allnorms = allnorms.concat ([-1, 0, 0, -1, 0, 0, -1, 0, 0,]);
      allnorms = allnorms.concat ([-1, 0, 0, -1, 0, 0, -1, 0, 0,]);

      // right side
      allverts = allverts.concat( [1.0,0.0,0.0, 1.0,1.0,1.0, 1.0,0.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 1,1, 1,0]);
      allverts = allverts.concat( [1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0,]);
      alluvs = alluvs.concat( [0,0, 0,1, 1,1]);
      allnorms = allnorms.concat ([1, 0, 0, 1, 0, 0, 1, 0, 0,]);
      allnorms = allnorms.concat ([1, 0, 0, 1, 0, 0, 1, 0, 0,]);

      drawTriangle3DUVNormal(allverts, alluvs, allnorms);
    }
  }

  function drawCube(pos, scale, rot, color, textureno) {
    var body = new Cube();
    body.color = color;
    body.textureNum = textureno;
    body.matrix.translate(pos[0],pos[1],pos[2]);
    body.matrix.rotate(rot[0], rot[1], rot[2], rot[3]); //remember that rot[1] is x, and rot[2] is y, rot[3] is z
    //var matrixStore = new Matrix4(body.matrix);
    body.matrix.scale(scale[0],scale[1],scale[2]);
    body.renderfast();

    //return matrixStore;
  }

