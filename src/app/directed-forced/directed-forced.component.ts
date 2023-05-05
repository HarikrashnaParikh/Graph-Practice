import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

// interface Node {
//   id: string;
//   name: string;
//   x: number;
//   y: number;
// }

// interface Link {
//   source: string;
//   target: string;
// }

interface Node {
  id: string;
  name: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  children?: Node[];
}
interface Link {
  source: string;
  target: string;
}

@Component({
  selector: 'app-directed-forced',
  templateUrl: './directed-forced.component.html',
  styleUrls: ['./directed-forced.component.css'],
})
export class DirectedForcedComponent implements OnInit {
  //   @ViewChild('svg') svg: ElementRef<SVGElement> | any;

  //   ngOnInit(): void {
  //     this.renderGraph();
  //   }

  //   renderGraph() {

  //     const width = 800;
  //     const height = 500;

  //     const nodes: Node[] = [
  //       { id: 'A', name: 'Node A', x: 100, y: 100 },
  //       { id: 'B', name: 'Node B', x: 200, y: 200 },
  //       { id: 'C', name: 'Node C', x: 300, y: 300 },
  //       { id: 'D', name: 'Node D', x: 400, y: 400 },
  //       { id: 'E', name: 'Node E', x: 500, y: 500 },
  //     ];

  //     const links: Link[] = [
  //       { source: 'A', target: 'B' },
  //       { source: 'A', target: 'C' },
  //       { source: 'B', target: 'D' },
  //       { source: 'C', target: 'E' },
  //       { source: 'D', target: 'E' },
  //     ];

  //     const svg = d3
  //       .select('svg#svg')

  //       .attr('width', width)
  //       .attr('height', height);

  //     // const simulation = d3.forceSimulation(nodes)
  //     //   .force('link', d3.forceLink(links).id(d => d.id).distance(100))
  //     //   .force('charge', d3.forceManyBody().strength(-100))
  //     //   .force('center', d3.forceCenter(width / 2, height / 2));

  //     const simulation = d3.forceSimulation<Node, Link>(nodes)
  //     .force("charge", d3.forceManyBody<Node>())
  //     .force("center", d3.forceCenter<Node>(width / 2, height / 2))
  //     .on("tick", ticked);

  //     const link = svg.append('g')
  //       .selectAll('line')
  //       .data(links)
  //       .enter().append('line')
  //       .attr('stroke', '#ccc')
  //       .attr('stroke-width', 1);

  //     const node = svg.append('g')
  //       .selectAll('circle')
  //       .data(nodes)
  //       .enter().append('circle')
  //       .attr('r', 10)
  //       .attr('fill', '#000');

  //     node.append('title')
  //       .text(d => d.name);

  //       simulation.on('tick', () => {
  //         link
  //           .attr('x1', d => (d.source as any).x)
  //           .attr('y1', d => (d.source as any).y)
  //           .attr('x2', d => (d.target as any).x)
  //           .attr('y2', d => (d.target as any).y);

  //         node
  //           .attr('cx', d => d.x)
  //           .attr('cy', d => d.y);
  //       });
  //   }
  // }

  // function ticked(this: d3.Simulation<Node, Link>): void {
  //   throw new Error('Function not implemented.');
  // }
  // @ViewChild('svg') svg: ElementRef<SVGElement> | any;

  //   ngOnInit(): void {
  //     this.renderTree();
  //   }

  //   renderTree() {
  //     const width = 800;
  //     const height = 500;

  //     const data: Node = {
  //       id: 'A',
  //       name: 'Node A',
  //       children: [
  //         {
  //           id: 'B',
  //           name: 'Node B',
  //           children: [
  //             { id: 'D', name: 'Node D' },
  //             { id: 'E', name: 'Node E' },
  //           ],
  //         },
  //         {
  //           id: 'C',
  //           name: 'Node C',
  //           children: [
  //             { id: 'F', name: 'Node F' },
  //             { id: 'G', name: 'Node G' },
  //           ],
  //         },
  //       ],
  //     };

  //     const svg = d3.select(this.svg.nativeElement)
  //       .attr('width', width)
  //       .attr('height', height);

  //     const treeLayout = d3.tree<Node>().size([height, width]);

  //     const root = d3.hierarchy<Node>(data);

  //     treeLayout(root);

  //     const link = svg.selectAll('.link')
  //       .data(root.links())
  //       .enter().append('path')
  //       .attr('class', 'link')
  //       .attr('d', d3.linkHorizontal()
  //         .x(d => d.y)
  //         .y(d => d.x));

  //     const node = svg.selectAll('.node')
  //       .data(root.descendants())
  //       .enter().append('g')
  //       .attr('class', 'node')
  //       .attr('transform', d => `translate(${d.y},${d.x})`);

  //     node.append('circle')
  //       .attr('r', 10)
  //       .attr('fill', '#000');

  //     node.append('text')
  //       .text(d => d.data.name)
  //       .attr('dx', 15)
  //       .attr('dy', 5);
  //   }



  private nodes: Node[] = [
    { id: 'node1', name: 'Node 1' },
    { id: 'node2', name: 'Node 2' },
    { id: 'node3', name: 'Node 3' },
  ];

  private links: Link[] = [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
    { source: 'node3', target: 'node1' },
  ];

  private simulation!: d3.Simulation<Node, Link>;

  private svg!: d3.Selection<SVGElement, unknown, null, undefined>;

  private link!: d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;

  private node!: d3.Selection<SVGGElement, Node, SVGGElement, unknown>;

  private color!: d3.ScaleOrdinal<string, unknown>;

  private drag!: (
    simulation: d3.Simulation<Node, Link>
  ) => d3.DragBehavior<Element, Node, Node | d3.SubjectPosition>;

  // private d3Graph!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private d3Graph!: any;

  constructor() {}

  ngOnInit(): void {
    console.log('in OnInit');
    this.createD3Graph();
  }

  private createD3Graph(): void {
    console.log('starting of create 3d graph');
    this.d3Graph = d3
      .select('svg#svg')
      .attr('width', '100%')
      .attr('height', '100%');

    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.simulation = d3
      .forceSimulation(this.nodes)
      .force(
        'link',
        d3.forceLink(this.links).id((d: any) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force(
        'center',
        d3.forceCenter(
          this.d3Graph.attr('width') / 2,
          this.d3Graph.attr('height') / 2
        )
      );

    this.link = this.d3Graph
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.links)
      .enter()
      .append('line')
      .attr('stroke-width'
      // , (d: any) => {
      //   console.log(d);
      //   return d.target.vx}
      , 3
      )
      .attr('stroke', 'red')
      .attr('x1', '10')
      .attr('x2', '100')
      .attr('y1', '10')
      .attr('y2', '100');
      console.log(this.link);
    console.log('middle of create 3d graph');

    this.node = this.d3Graph
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(this.nodes)
      .enter()
      .append('g');
    console.log('end of create 3d graph');

    // .call(d3.drag().on('start', this.dragStarted).on('drag', this.dragged).on('end', this.drag))
  }
}
