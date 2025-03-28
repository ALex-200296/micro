import React, { memo } from 'react';
import { IIconProps } from '@shared/lib';

export const LogoIcon: React.FC<IIconProps> = memo(({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fillRule='evenodd'
    clipRule='evenodd'
    width='4rem'
    height='2.063rem'
    imageRendering='optimizeQuality'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    viewBox='0 0 43065 22282'
    {...props}
  >
    <path d='M3357 22282c-544,0 -1025,-90 -1442,-271 -417,-180 -766,-428 -1049,-743 -282,-315 -497,-690 -645,-1123 -147,-433 -221,-906 -221,-1418 0,-518 75,-996 226,-1432 151,-437 370,-812 655,-1127 286,-315 637,-562 1054,-739 416,-177 894,-266 1432,-266 538,0 1016,87 1433,261 417,174 768,419 1053,734 286,315 502,691 650,1127 148,437 222,914 222,1433 0,512 -74,986 -222,1422 -148,437 -364,813 -650,1128 -285,315 -638,563 -1058,743 -420,181 -899,271 -1438,271zm10 -6095c-374,0 -697,69 -970,207 -272,138 -500,322 -684,551 -184,230 -320,499 -408,808 -89,308 -133,630 -133,965 0,334 44,654 133,960 88,305 223,576 403,812 181,236 409,423 684,561 276,138 601,207 975,207 368,0 689,-67 965,-202 276,-135 504,-317 684,-546 181,-230 315,-498 404,-803 89,-305 133,-632 133,-980 0,-341 -44,-664 -133,-969 -89,-306 -223,-575 -404,-808 -180,-233 -407,-418 -679,-556 -272,-138 -596,-207 -970,-207zm4391 6026l0 -5189 1074 0 59 719c190,-269 428,-471 713,-606 286,-134 590,-201 911,-201 368,0 678,62 931,187 252,124 459,295 620,512 161,216 276,472 345,768 68,295 103,617 103,964l0 2846 -1123 0 0 -2678c0,-223 -14,-430 -44,-620 -29,-191 -87,-360 -172,-507 -85,-148 -205,-265 -360,-350 -154,-85 -352,-128 -595,-128 -230,0 -438,56 -625,167 -187,112 -332,256 -434,434 -101,177 -174,374 -216,590 -43,217 -64,424 -64,621l0 2471 -1123 0zm6873 -2215c13,190 52,367 118,531 65,164 156,307 271,428 114,122 256,219 423,291 167,72 363,108 586,108 236,0 453,-42 650,-128 196,-85 341,-233 433,-443l1152 0c-66,263 -173,489 -320,680 -148,190 -322,346 -522,467 -200,122 -420,210 -660,266 -239,56 -494,84 -763,84 -413,0 -776,-63 -1088,-187 -312,-125 -572,-306 -782,-542 -210,-236 -366,-517 -468,-842 -102,-325 -153,-690 -153,-1097 0,-394 56,-754 168,-1079 111,-324 274,-605 487,-841 213,-237 471,-422 773,-557 302,-134 646,-201 1034,-201 407,0 758,67 1053,201 296,135 543,317 744,547 200,230 349,499 447,807 99,309 148,643 148,1004 0,171 -10,338 -29,503l-3702 0zm2638 -847c-13,-394 -138,-699 -374,-916 -236,-216 -541,-325 -915,-325 -211,0 -394,33 -552,99 -157,65 -290,154 -399,266 -108,111 -195,242 -261,393 -65,151 -108,312 -127,483l2628 0zm3791 3062l0 -5937 -2205 0 0 -1024 5562 0 0 1024 -2215 0 0 5937 -1142 0zm4490 -2215c13,190 52,367 118,531 65,164 156,307 270,428 115,122 257,219 424,291 167,72 363,108 586,108 236,0 453,-42 649,-128 197,-85 342,-233 434,-443l1152 0c-66,263 -173,489 -320,680 -148,190 -322,346 -522,467 -200,122 -420,210 -660,266 -239,56 -494,84 -763,84 -413,0 -776,-63 -1088,-187 -312,-125 -573,-306 -783,-542 -210,-236 -365,-517 -467,-842 -102,-325 -153,-690 -153,-1097 0,-394 56,-754 168,-1079 111,-324 274,-605 487,-841 213,-237 471,-422 773,-557 302,-134 646,-201 1034,-201 407,0 758,67 1053,201 295,135 543,317 743,547 201,230 350,499 448,807 99,309 148,643 148,1004 0,171 -10,338 -29,503l-3702 0zm2638 -847c-13,-394 -138,-699 -374,-916 -236,-216 -541,-325 -916,-325 -210,0 -393,33 -551,99 -157,65 -290,154 -399,266 -108,111 -195,242 -261,393 -65,151 -108,312 -128,483l2629 0zm5455 2422c-171,243 -397,422 -680,536 -282,115 -597,173 -945,173 -275,0 -527,-33 -753,-99 -226,-65 -425,-165 -596,-300 -170,-135 -305,-302 -403,-502 -99,-200 -148,-428 -148,-684 0,-283 56,-524 167,-724 112,-200 265,-363 458,-487 194,-125 422,-219 684,-281 263,-62 539,-94 828,-94l1329 0c0,-380 -86,-676 -256,-886 -171,-210 -470,-318 -896,-325 -250,0 -465,43 -645,128 -181,86 -300,227 -360,424l-1152 0c40,-276 130,-509 271,-699 141,-191 312,-348 512,-473 200,-125 424,-213 670,-266 246,-52 494,-78 743,-78 322,0 620,42 896,128 276,85 515,229 719,433 230,236 384,518 463,846 78,329 118,686 118,1074l0 2796 -975 0 -49 -640zm-59 -1664l-1083 0c-191,0 -381,15 -571,44 -191,30 -353,99 -488,207 -134,108 -202,264 -202,468 0,249 91,438 271,566 181,128 402,192 665,192 203,0 392,-26 566,-79 174,-52 323,-139 448,-261 125,-121 221,-276 290,-463 69,-187 104,-412 104,-674zm3357 -2885c7,53 10,105 10,158l29 305c7,52 10,105 10,157 361,-485 834,-728 1418,-728 368,0 663,75 886,226 223,151 397,351 522,601 203,-269 435,-474 694,-615 259,-142 563,-212 911,-212 295,0 550,49 763,148 213,98 384,236 512,413 128,177 221,382 280,615 60,233 89,481 89,744l0 3377 -1122 0 0 -2964c0,-157 -10,-315 -30,-472 -20,-158 -61,-301 -123,-429 -62,-128 -153,-233 -271,-315 -118,-82 -275,-123 -472,-123 -210,0 -383,51 -517,153 -135,102 -240,225 -315,369 -76,145 -127,307 -153,487 -26,181 -39,360 -39,537l0 2757 -1113 0 0 -2983c0,-151 -8,-304 -24,-458 -17,-154 -55,-294 -114,-419 -59,-124 -146,-229 -261,-315 -114,-85 -274,-128 -477,-128 -210,0 -386,53 -527,158 -141,105 -251,234 -330,389 -78,154 -131,321 -157,502 -26,180 -40,346 -40,497l0 2757 -1112 0 0 -5189 1073 0z' />
    <path d='M27963 13100c-298,-541 -298,-1529 -298,-3171 0,-1241 -671,-2148 -1530,-2634 1136,-593 1824,-1817 1824,-3384 0,-2445 -1597,-3636 -4886,-3636l-6454 0 0 13414 1447 0 0 -5758 4919 0c750,0 3198,144 3198,1998 0,1604 0,2663 322,3494l102 266 1682 0 -326 -589zm7814 -600c-3359,-5 -5445,-2160 -5445,-5627 0,-3425 2086,-5552 5445,-5560l0 -1303c-4300,6 -6864,2571 -6864,6863 0,4293 2564,6857 6864,6863l0 -1236zm-35677 1189l1638 0 0 -9787 -1638 0 0 9787zm1638 -11362l0 -2053 -1638 0 0 2053 1638 0zm35249 -2327l0 1368c2604,0 4704,2105 4704,4709l1374 0c0,-3360 -2717,-6077 -6078,-6077zm6072 7641l-1378 0c0,2610 -2101,4712 -4700,4712l0 1376c3358,0 6078,-2715 6078,-6088zm-32745 -7366l-5480 0 0 13414 1430 0 0 -5514 4050 0c3077,0 4622,-982 4907,-3155l-1520 0c-265,1346 -1313,1847 -3631,1847l-3806 0 0 -5318 3806 0c2309,0 3377,529 3637,1896l1513 0c-291,-2156 -1870,-3170 -4906,-3170zm7752 1274l4692 0c2678,0 3721,712 3721,2538 0,1791 -1061,2554 -3545,2554l-4868 0 0 -5092z' />
  </svg>
));
